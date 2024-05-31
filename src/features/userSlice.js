import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        reset: false
    },
    reducers: {
        refresh: (state)=>{
            state.reset = !state.reset;
        }
    }
})
export const {refresh }= userSlice.actions;
export default userSlice.reducer