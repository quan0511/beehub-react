import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import apiSlice from "./features/apiSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        apiSlice: apiSlice
    }
})