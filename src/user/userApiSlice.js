import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        homepage: builder.query({
            query: data => ({
                url: '/homepage/1',
                data
            })
        }),

        friends: builder.query({
            query: data => ({
                url: '/friends/1',
                data
            })
        })
    })
})

export const {
    useHomepageQuery,
    useFriendsQuery
} = userApiSlice