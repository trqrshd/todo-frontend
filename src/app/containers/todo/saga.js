import { message } from "antd";
import { takeLatest, put, select } from "redux-saga/effects";
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
    const response = yield axios.post("todos", payload);
    yield put(createTodoSuccess(response.data));
    yield put(setFormVisible(false));
  } catch (e) {
    yield put(createTodoError());
  }
}

function* deleteTodoSaga({ payload: id }) {
  try {
    yield axios.delete(`todos/${id}`);
    yield put(deleteTodoSuccess(id));
  } catch (e) {
    yield put(deleteTodoError(id));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchTodoListRequest.type, fetchDataSaga);
  yield takeLatest(createTodoRequest.type, createTodoSaga);
  yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
}
