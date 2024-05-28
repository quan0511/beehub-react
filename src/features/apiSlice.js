import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import APIService from '../auth/APIService';


export const fetchApiUserFriendsGroups= createAsyncThunk("fetchData",async ()=>{
    const response = await axios.get(`${APIService.URL_REST_API}/groups_friends/1`);
    return response.data;
});
export const apiSlice = createSlice({
    name: "apiSlice",
    initialState: {
        loading: false,
        groups_friends: null,
        error: false
    },
    
    extraReducers: (builder)=> {
        builder.addCase(fetchApiUserFriendsGroups.pending, (state,action)=>{
            state.loading = true;
        });
        builder.addCase(fetchApiUserFriendsGroups.fulfilled, (state, action)=>{
            state.loading = false;
            state.groups_friends = action.payload;
        });
        builder.addCase(fetchApiUserFriendsGroups.rejected,(state,action)=>{
            state.error = true;
        });
    }
})

export default apiSlice.reducer