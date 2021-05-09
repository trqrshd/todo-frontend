import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { fetchData } from "./app/store";
import { sagaActions } from "./sagaActions";

export function* fetchDataSaga() {
  try {
    const response = yield axios.get("todos");
    yield put(fetchData(response.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
}
