import { useSelector } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from '../auth/authSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        homepage: builder.query({
            query: data => ({
                url: '/homepage/'+user.id,
                data
            })
        }),

        friends: builder.query({
            query: data => ({
                url: '/friends/'+user.id,
                data
            })
        })
    })
})

export const {
    useHomepageQuery,
    useFriendsQuery
} = userApiSlice