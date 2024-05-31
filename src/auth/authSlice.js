import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { id, username, email, roles, token } = action.payload
            state.user = { id, username, email, roles }
            state.token = token
        },
        logOut: (state, _) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRoles = (state) => state.auth.user?.roles