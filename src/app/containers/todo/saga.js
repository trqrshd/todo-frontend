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
} from "./slice";

export function* fetchDataSaga() {
  try {
    const response = yield axios.get("todos");
    yield put(
      fetchTodoListSuccess(
        response.data.map((item) => ({ ...item, editing: false }))
      )
    );
  } catch (e) {
    yield put(fetchTodoListError());
  }
}

function* createTodoSaga({ payload }) {
  try {
    yield axios.post("todos", payload);
    yield put(createTodoSuccess());
    yield put(fetchTodoListRequest());
    yield put(setFormVisible(false));
  } catch (e) {
    yield put(createTodoError());
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchTodoListRequest.type, fetchDataSaga);
  yield takeLatest(createTodoRequest.type, createTodoSaga);
}
