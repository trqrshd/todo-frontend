import axios from "axios";
import { message } from "antd";
import { takeEvery, put, delay } from "redux-saga/effects";

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
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoError,
  setEditMode,
} from "./slice";

export function* fetchDataSaga() {
  try {
    yield delay(1000);
    const response = yield axios.get("todos");
    yield put(
      fetchTodoListSuccess(
        response.data
          .map((item) => ({
            ...item,
            editing: false,
            editLoading: false,
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
    yield delay(1000);
    const response = yield axios.post("todos", payload);
    yield put(createTodoSuccess(response.data));
    yield put(setFormVisible(false));
    document.getElementById("newly-added-todo").classList.add("animate-color");
    yield delay(500);
    document
      .getElementById("newly-added-todo")
      .classList.remove("animate-color");
    message.success(`Todo is created with title: "${response.data.title}"`);
  } catch (e) {
    yield put(createTodoError());
  }
}

function* updateTodoSaga({ payload }) {
  try {
    yield delay(1000);
    const response = yield axios.put(`todos/${payload.id}`, payload);
    yield put(updateTodoSuccess(response.data));
    yield put(setEditMode({ id: response.data.id, editing: false }));
    message.success(`Todo is updated with title: "${response.data.title}"`);
  } catch (e) {
    yield put(updateTodoError(payload));
  }
}

function* deleteTodoSaga({ payload: { title, id } }) {
  try {
    yield delay(1000);
    yield axios.delete(`todos/${id}`);
    yield put(deleteTodoSuccess(id));
    message.success(`Todo id deleted with title: "${title}"`);
  } catch (e) {
    yield put(deleteTodoError(id));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchTodoListRequest.type, fetchDataSaga);
  yield takeEvery(createTodoRequest.type, createTodoSaga);
  yield takeEvery(updateTodoRequest.type, updateTodoSaga);
  yield takeEvery(deleteTodoRequest.type, deleteTodoSaga);
}
