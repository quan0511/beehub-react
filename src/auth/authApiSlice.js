import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        register: builder.mutation({
            query: credentials => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        logout: builder.mutation({
            query: _ => ({
                url: '/auth/signout',
                method: 'POST'
            })
        }),


    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice