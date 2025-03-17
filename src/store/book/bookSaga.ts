import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure } from "./bookSlice";

function* fetchBooksSaga(action: ReturnType<typeof fetchBooksRequest>): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `https://www.googleapis.com/books/v1/volumes?q=${action.payload}&maxResults=10`
    );

    const formattedBooks = response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Autor Desconhecido"],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x180",
    }));

    yield put(fetchBooksSuccess(formattedBooks));
  } catch (error) {
    yield put(fetchBooksFailure("Erro ao buscar livros"));
  }
}

export function* watchBookSaga() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
}
