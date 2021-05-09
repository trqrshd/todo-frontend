import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import saga from "./containers/todo/saga";
import todoSlice from "./containers/todo/slice";

let sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
