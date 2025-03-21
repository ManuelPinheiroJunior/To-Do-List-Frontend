import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure, signUpValidationFailure, signUpRequest, signUpFailure, signUpSuccess } from "./authSlice";
import custom_axios from "../../axios/AxiosSetup";
import { ApiConstants } from "../../api/ApiConstants";
import { getLoginInfo } from "../../utils/LoginInfo";
import { redirectTo } from "../../utils/navigateHelper";
import { validateSignUp } from "../../utils/validation";
import translations from "../../translations/translations.json";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const typedTranslations: Translations = translations;

function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  const language = localStorage.getItem("language") || "en";
  const t = typedTranslations[language];

  try {
    const response = yield call(custom_axios.post, ApiConstants.LOGIN, action.payload);
    yield put(loginSuccess({ token: response.data.token, userId: response.data.userId }));

    const data = getLoginInfo();
    const userId = data?.userId;

    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId || userId);
      redirectTo("/tasks");
    }
    console.log(response);
  } catch (error: any) {
    yield put(loginFailure(t.invalidLoginCredentials));
  }
}

function* handleSignUp(action: ReturnType<typeof signUpRequest>): Generator<any, void, any> {
  const language = localStorage.getItem("language") || "en";
  const t = typedTranslations[language];

  const validationErrors = validateSignUp(action.payload);

  if (validationErrors) {
    yield put(signUpValidationFailure(validationErrors));
    return;
  }

  try {
    const response = yield call(custom_axios.post, ApiConstants.USER.SIGN_UP, action.payload);

    if (response.status === 201) {
      yield put(signUpSuccess());
      redirectTo("/login");
    }
  } catch (error: any) {
    console.error("❌ Erro SingUp:", error);
    yield put(signUpFailure(t.errorCreatingAccount));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signUpRequest.type, handleSignUp);
}