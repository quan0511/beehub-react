import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        reset: false,
        newProfile: false,
        showMessage: false,
        message: "",
        preLocation: "",
        resetHomepage: false,
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
        changedProfile: (state)=>{
            state.newProfile = true;
        },
        oldProfile: (state)=>{
            state.newProfile = false;
        },
        showMessageAlert: (state,payload)=>{
            state.showMessage= true;
            state.message = payload.payload;
        },
        closeMessageAlert: (state)=>{
            state.showMessage = false;
        },
        setPreLocation:(state,payload)=>{
            state.preLocation = payload.payload;
        },
        startResetHomepage:(state)=>{
            state.resetHomepage = true;
        },
        cancelResetHomepage: (state)=>{
            state.resetHomepage =false;
        }
    }
})
export const {refresh,showMessageAlert,closeMessageAlert, resetData, cancelReset, changedProfile, oldProfile,setPreLocation,startResetHomepage, cancelResetHomepage}= userSlice.actions;
export default userSlice.reducer