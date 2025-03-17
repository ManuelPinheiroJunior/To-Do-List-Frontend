import { all } from "redux-saga/effects";
import { watchTaskSaga } from "./task/taskSaga";

import { watchUsersSaga } from "./user/userSaga";
import { watchAuthSaga } from "./auth/authSaga";
import { watchBookSaga } from "./book/bookSaga";


export default function* rootSaga() {
  yield all([
    watchTaskSaga(),
    watchAuthSaga(),
    watchUsersSaga(),
     watchBookSaga(),
  ]);
}