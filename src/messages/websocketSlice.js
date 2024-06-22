import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
    name: "websocket",
    initialState: {
        ws: new WebSocket("ws://localhost:8080/ws"),
    },
    reducers: {
        setWs: (state, action) => {
            state.ws = action.payload
        },
        endWs: (state, action) => { state.ws = null }
    }
})

export const {setWs, endWs} = websocketSlice.actions

export default websocketSlice.reducer

export const selectWs = (state) => state.websocket.ws