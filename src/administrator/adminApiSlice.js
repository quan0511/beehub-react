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
            }),
            providesTags: ['Report']
        }),

        adminUsers: builder.query({
            query: _ => ({
                url: '/admin/users',
            }),
            providesTags: ['User']
        }),

        adminUser: builder.query({
            query: id => ({
                url: '/admin/users/' + id,
            }),
            providesTags: ['User']
        }),

        adminCreateUser: builder.mutation({
            query: payload => ({
                url: '/admin/users',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['User']
        }),

        adminPatchUserRole: builder.mutation({
            query: ({id, role}) => ({
                url: `/admin/users/${id}/${role}`,
                method: 'PATCH',
            })
        }),

        adminBanUser: builder.mutation({
            query: id => ({
                url: `/admin/users/${id}/ban`,
                method: 'PATCH'
            }),
            invalidatesTags: ['User', 'Report']
        }),

        adminDeleteUser: builder.mutation({
            query: id => ({
                url: `/admin/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User', 'Report']
        }),

        adminGroups: builder.query({
            query: _ => ({
                url: '/admin/groups'
            }),
            providesTags: ['Group']
        }),
        
        adminGroup: builder.query({
            query: id => ({
                url: '/admin/groups/' + id
            }),
            providesTags: ['Group']
        }),

        adminDeleteGroup: builder.mutation({
            query: id => ({
                url: '/admin/groups/' + id,
                method: 'DELETE'
            }),
            invalidatesTags: ['Group', 'Report']
        }),

        adminPosts: builder.query({
            query: _ => ({
                url: '/admin/posts'
            }),
            providesTags: ['Post']
        }),

        adminPost: builder.query({
            query: id => ({
                url: '/admin/posts/' + id
            }),
            providesTags: ['Post']
        }),

        adminBlockPost: builder.mutation({
            query: id => ({
                url: `/admin/posts/${id}/block`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Post', 'Report']
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
    useAdminPatchUserRoleMutation,
    useAdminBanUserMutation,
    useAdminDeleteUserMutation,
    useAdminDeleteGroupMutation,
    useAdminBlockPostMutation,
} = adminApiSlice