import { call, put, takeLatest } from "redux-saga/effects";
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
    let data = getLoginInfo();

    let attempts = 0;

    while ((!data || !data.userId) && attempts < 6) {
      yield new Promise((resolve) => setTimeout(resolve, 500));
      data = getLoginInfo();
      attempts++;
    }

    if (!data?.userId) {
      throw new Error("User ID not found");
    }

    const token = localStorage.getItem("token");


    if (!token) {
      throw new Error("Token não encontrado!");
    }

    const userId = data.userId;


    const activeResponse = yield call(custom_axios.get, `/tasks/not-completed/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    const completedResponse = yield call(custom_axios.get, `/tasks/completed/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    yield put(fetchTaskSuccess({ activeTasks: activeResponse.data, completedTasks: completedResponse.data }));
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
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