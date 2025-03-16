import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} from "./usersSlice";
import custom_axios from "../../axios/AxiosSetup";
import { ApiConstants } from "../../api/ApiConstants";

function* fetchUsers(): Generator<any, void, any> {
  try {
    const response = yield call(custom_axios.get, ApiConstants.USER.FIND_ALL, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(fetchUsersFailure("Failed to fetch users"));
  }
}

function* deleteUser(action: ReturnType<typeof deleteUserRequest>) {
  try {
    yield call(custom_axios.delete, ApiConstants.USER.DELETE(action.payload), {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    yield put(deleteUserSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteUserFailure("Failed to delete user"));
  }
}

function* editUser(action: ReturnType<typeof editUserRequest>): Generator<any, void, any> {
  try {
    const response = yield call(custom_axios.put, ApiConstants.USER.EDIT(action.payload.id), action.payload.data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    yield put(editUserSuccess(response.data));
  } catch (error: any) {
    yield put(editUserFailure("Failed to edit user"));
  }
}

export function* watchUsersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(deleteUserRequest.type, deleteUser);
  yield takeLatest(editUserRequest.type, editUser);
}