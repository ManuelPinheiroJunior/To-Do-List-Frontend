import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure, signUpRequest, signUpFailure, signUpSuccess } from "./authSlice";
import custom_axios from "../../axios/AxiosSetup";
import { ApiConstants } from "../../api/ApiConstants";
import { getLoginInfo } from "../../utils/LoginInfo";

function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  console.log("🚀 ~ function*handleLogin ~ action:", action)
  try {
    const response = yield call(custom_axios.post, ApiConstants.LOGIN, action.payload);
    console.log("🚀 ~ function*handleLogin ~ response:", response)
    yield put(loginSuccess({ token: response.data.token, userId: response.data.userId }));

    const data = getLoginInfo();
    console.log("🚀 ~ function*handleLogin ~ data:", data)
    const userId = data?.userId;

    if (response.status === 201) { 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId || userId);
      window.location.href = "/tasks"; 
    }
    console.log(response);
  } catch (error: any) {
    yield put(loginFailure("Invalid login credentials"));
  }
}

function* handleSignUp(action: ReturnType<typeof signUpRequest>): Generator<any, void, any> {
  try {
    const response = yield call(custom_axios.post, ApiConstants.USER.SIGN_UP, action.payload);
    if (response.status === 201) {
      yield put(signUpSuccess());
      window.location.href = "/login"; 
    }
  } catch (error: any) {
    yield put(signUpFailure("Error creating account. Please try again."));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
   yield takeLatest(signUpRequest.type, handleSignUp);
}

