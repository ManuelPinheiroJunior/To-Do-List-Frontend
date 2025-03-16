import { all } from "redux-saga/effects";
import { watchTaskSaga } from "./task/taskSaga";
import { watchAuthSaga } from "./auth/authSaga";
import { watchUsersSaga } from "./user/userSaga";


export default function* rootSaga() {
  yield all([
    watchTaskSaga(),
    watchAuthSaga(),
    watchUsersSaga(),
  ]);
}