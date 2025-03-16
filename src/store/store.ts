import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import taskReducer from "./task/taskSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/usersSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware : any) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
