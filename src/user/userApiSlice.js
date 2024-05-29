import { useSelector } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from '../auth/authSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        homepage: builder.query({
            query: arg => ({
                url: '/homepage/'+arg.id
            })
        }),

        friends: builder.query({
            query: ({id}) => ({
                url: '/friends/'+id
            })
        }),
        user : builder.query({
            query: ({id}) => ({
                url: '/user/'+id,
            })
        })
    })
})

export const {
    useHomepageQuery,
    useFriendsQuery,
    useUserQuery
} = userApiSlice