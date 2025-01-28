import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import { transactionsApi } from "./slices/transactions-api";
import { userApi } from "./slices/user-api";

export const store = configureStore({
    reducer: {
        [transactionsApi.reducerPath]: transactionsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(transactionsApi.middleware)
        .concat(userApi.middleware)
});

export type ApplicationState = ReturnType<typeof store.getState>;
