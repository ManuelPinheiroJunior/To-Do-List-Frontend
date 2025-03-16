import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskFailure,
  addTaskRequest,
  addTaskuccess,
  addTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  MarkTaskCompleteRequest,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
} from "./taskSlice";
import custom_axios from "../../axios/AxiosSetup";
import { ApiConstants } from "../../api/ApiConstants";
import { getLoginInfo } from "../../utils/LoginInfo";

function* fetchTask(): Generator<any, void, any> {
  try {

    yield delay(500); 
    const data = getLoginInfo();
    const userId = data?.userId;
    const activeResponse = yield call(custom_axios.get, ApiConstants.TODO.FIND_NOT_COMPLETED(Number(userId)));
    const completedResponse = yield call(custom_axios.get, ApiConstants.TODO.FIND_COMPLETED(Number(userId)));
    yield put(fetchTaskSuccess({ activeTasks: activeResponse.data, completedTasks: completedResponse.data }));
  } catch (error) {
    yield put(fetchTaskFailure());
  }
}

function* addTask(action: ReturnType<typeof addTaskRequest>) {
  try {
    const data = getLoginInfo();
    const userId = data?.userId;
    yield call(custom_axios.post, ApiConstants.TODO.ADD(Number(userId)), { title: action.payload });
    yield put(addTaskuccess());
    yield put(fetchTaskRequest()); 
  } catch (error) {
    yield put(addTaskFailure());
  }
}

function* editTask(action: ReturnType<typeof editTaskRequest>) {
  try {
    yield call(custom_axios.put, ApiConstants.TODO.EDIT(action.payload.id), { title: action.payload.title });
    yield put(editTaskSuccess({ id: action.payload.id, title: action.payload.title, date: new Date().toISOString() }));
    yield put(fetchTaskRequest()); 
  } catch (error) {
    yield put(editTaskFailure());
  }
}


function* MarkTaskComplete(action: ReturnType<typeof MarkTaskCompleteRequest>) {
  try {
    yield call(custom_axios.patch, ApiConstants.TODO.MARK_COMPLETE(Number(action.payload)));
    yield put(addTaskuccess());
    yield put(fetchTaskRequest()); 
  } catch (error) {
    yield put(addTaskFailure());
  }
}

function* deleteTask(action: ReturnType<typeof deleteTaskRequest>) {
  try {
    yield call(custom_axios.delete, ApiConstants.TODO.DELETE(action.payload));
    yield put(deleteTaskSuccess());
    yield put(fetchTaskRequest()); 
  } catch (error) {
    yield put(deleteTaskFailure());
  }
}

export function* watchTaskSaga() {
  yield takeLatest(fetchTaskRequest.type, fetchTask);
  yield takeLatest(addTaskRequest.type, addTask);
  yield takeLatest(MarkTaskCompleteRequest.type, MarkTaskComplete);
  yield takeLatest(deleteTaskRequest.type, deleteTask);
  yield takeLatest(editTaskRequest.type, editTask);
}