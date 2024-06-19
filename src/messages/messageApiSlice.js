import { apiSlice } from "../api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessagesForUser: builder.query({
            query: id => ({
                url: '/messages/user/' + id,
            }),
            providesTags: ['Message']
        }),

        getMessagesForGroup: builder.query({
            query: id => ({
                url: '/messages/group/' + id,
            }),
            providesTags: ['Message']
        }),

        createMessageForUser: builder.mutation({
            query: ({ recipientId, content }) => ({
                url: '/messages/user',
                method: 'POST',
                body: { recipientId, content },
            }),
            invalidatesTags: ['Message']
        }),

        createMessageForGroup: builder.mutation({
            query: ({ recipientId, content }) => ({
                url: '/messages/group',
                method: 'POST',
                body: { recipientId, content },
            }),
            invalidatesTags: ['Message']
        })
    })
})

export const {
    useGetMessagesForUserQuery,
    useGetMessagesForGroupQuery,
    useCreateMessageForUserMutation,
    useCreateMessageForGroupMutation
} = messageApiSlice