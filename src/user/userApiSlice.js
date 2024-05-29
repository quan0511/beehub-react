import { useSelector } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from '../auth/authSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        homepage: builder.query({
            query: ({id}) => ({
                url: '/homepage/'+id,
                data
            })
        }),

        friends: builder.query({
            query: ({id}) => ({
                url: '/friends/'+id,
                data
            })
        }),
        user : builder.query({
            query: ({id}) => ({
                url: '/user/'+id,
                data
            })
        })
    })
})

export const {
    useHomepageQuery,
    useFriendsQuery,
    useUserQuery
} = userApiSlice