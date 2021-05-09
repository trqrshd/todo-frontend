import { message } from "antd";
import { takeLatest, put, delay, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTodoListRequest,
  fetchTodoListSuccess,
  fetchTodoListError,
  createTodoRequest,
  createTodoSuccess,
  createTodoError,
  setFormVisible,
  deleteTodoRequest,
  deleteTodoError,
  deleteTodoSuccess,
} from "./slice";

export function* fetchDataSaga() {
  try {
    yield delay(500);
    const response = yield axios.get("todos");
    yield put(
      fetchTodoListSuccess(
        response.data
          .map((item) => ({
            ...item,
            editing: false,
            deleting: false,
          }))
          .sort((a, b) => b.id - a.id)
      )
    );
  } catch (e) {
    yield put(fetchTodoListError());
  }
}

function* createTodoSaga({ payload }) {
  try {
    yield delay(500);
    const response = yield axios.post("todos", payload);
    yield put(createTodoSuccess(response.data));
    yield put(setFormVisible(false));
    message.success(`Todo is created with title: "${response.data.title}"`);
  } catch (e) {
    yield put(createTodoError());
  }
}

function* deleteTodoSaga({ payload: { title, id } }) {
  try {
    yield delay(500);
    yield axios.delete(`todos/${id}`);
    yield put(deleteTodoSuccess(id));
    message.success(`Todo id deleted with title: "${title}"`);
  } catch (e) {
    yield put(deleteTodoError(id));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchTodoListRequest.type, fetchDataSaga);
  yield takeLatest(createTodoRequest.type, createTodoSaga);
  yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
}
