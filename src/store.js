import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import authReducer from './auth/authSlice';
import userSlice from "./features/userSlice";
import chatReducer from "./messages/chatboxSlice";
import wsReducer from "./messages/websocketSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userSlice,
        chat: chatReducer,
        websocket: wsReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
})