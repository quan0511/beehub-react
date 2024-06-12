import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        reset: false,
        showMessage: false,
        message: ""
    },
    reducers: {
        refresh: (state)=>{
            state.reset = !state.reset;
        },
        resetData: (state)=>{
            state.reset = true;
        },
        cancelReset: (state)=>{
            state.reset = false;
        },
        showMessageAlert: (state,payload)=>{
            state.showMessage= true;
            state.message = payload.payload;
        },
        closeMessageAlert: (state)=>{
            state.showMessage = false;
        }
    }
})
export const {refresh,showMessageAlert,closeMessageAlert, resetData, cancelReset }= userSlice.actions;
export default userSlice.reducer