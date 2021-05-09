import createSagaMiddleware from "redux-saga";
import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import saga from "../saga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        todos: action.payload,
      };
    },
  },
});

export const { fetchData } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
