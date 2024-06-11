import { apiSlice } from "../api/apiSlice"

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        dashboard: builder.query({
            query: _ => ({
                url: '/admin/dashboard',
            })
        }),

        reports: builder.query({
            query: _ => ({
                url: '/admin/reports',
            })
        }),

        adminUsers: builder.query({
            query: _ => ({
                url: '/admin/users',
            }),
            providesTags: ['User']
        }),

        adminUser: builder.query({
            query: username => ({
                url: '/admin/users/' + username,
            }),
        }),

        adminCreateUser: builder.mutation({
            query: payload => ({
                url: '/admin/users',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['User']
        }),

        adminGroups: builder.query({
            query: _ => ({
                url: '/admin/groups'
            })
        }),
        
        adminGroup: builder.query({
            query: groupname => ({
                url: '/admin/groups/' + groupname
            })
        }),

        adminPosts: builder.query({
            query: _ => ({
                url: '/admin/posts'
            })
        }),

        adminPost: builder.query({
            query: id => ({
                url: '/admin/posts/' + id
            })
        }),
    })
})

export const {
    useDashboardQuery,
    useReportsQuery,
    useAdminUsersQuery,
    useAdminUserQuery,
    useAdminGroupsQuery,
    useAdminGroupQuery,
    useAdminPostQuery,
    useAdminPostsQuery,
    useAdminCreateUserMutation,
} = adminApiSlice