import createSagaMiddleware from "redux-saga";
import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import saga from "../saga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    form: { title: "", description: "" },
  },
  reducers: {
    fetchData: (state, action) => {
      state.todos = action.payload;
      // no need to manage immuteability
      // redux-toolkit handles it by default
      // return {
      //   ...state,
      //   todos: action.payload,
      // };
    },

    setFormValue: (state, action) => {
      state.form[action.payload.key] = action.payload.value;
    },
  },
});

export const { fetchData, setFormValue } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
