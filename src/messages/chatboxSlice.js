import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    userId: '',
    groupId: ''
}

export const chatboxSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        openChat: (state, _) => {state.open = true},
        closeChat: (state, _) => {state.open = false},
        setUserId: (state, action) => {state.userId = action.payload.id},
        setGroupId: (state, action) => {state.groupId = action.payload.id},
    }
})

export const isOpen = (state) => state.chat.open
export const userId = (state) => state.chat.userId
export const groupId = (state) => state.chat.groupId

export const { openChat, closeChat, setUserId, setGroupId } = chatboxSlice.actions

export default chatboxSlice.reducer