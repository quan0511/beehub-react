import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    chat: {
        id: '',
        isGroup: false,
        name: '',
        avatar: ''
    }
}

export const chatboxSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        openChat: (state, _) => { state.open = true },
        closeChat: (state, _) => { state.open = false },
        setChat: (state, { payload }) => {
            state.chat =
            {
                id: payload.id,
                isGroup: payload.isGroup,
                name: payload.name,
                avatar: payload.avatar
            }
        },
    }
})

export const isOpen = (state) => state.chat.open
export const chat = (state) => state.chat.chat

export const { openChat, closeChat, setChat } = chatboxSlice.actions

export default chatboxSlice.reducer