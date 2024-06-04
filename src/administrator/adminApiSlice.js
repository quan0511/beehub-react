import { apiSlice } from "../api/apiSlice"

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        reports: builder.query({
            query: _ => ({
                url: '/admin/reports',
            })
        }),

        adminUsers: builder.query({
            query: _ => ({
                url: '/admin/users',
            })
        }),

        adminUser: builder.query({
            query: username => ({
                url: '/admin/users/' + username,
            })
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
    useReportsQuery,
    useAdminUsersQuery,
    useAdminUserQuery,
    useAdminGroupsQuery,
    useAdminGroupQuery,
    useAdminPostQuery,
    useAdminPostsQuery,
} = adminApiSlice