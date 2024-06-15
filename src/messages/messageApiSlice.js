import { apiSlice } from "../api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessagesForUser: builder.query({
            query: id => ({
                url: '/messages/user/' + id,
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
                url: '/messages',
                method: 'POST',
                body: { recipientId, content },
            })
        })
    })
})

export const {
    useGetMessagesForUserQuery,
    useCreateMessageForUserMutation
} = messageApiSlice