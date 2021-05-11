import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import saga from "./components/saga";
import todoSlice from "./components/slice";

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
