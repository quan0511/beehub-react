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
        }),
        peoplepage: builder.query({
            query: arg => ({
                url: `/peoplepage/${arg.id}`
            })
        }),
        listgroup: builder.query({
            query: arg =>({
                url : `/listgroup_page/${arg.id}`
            })
        }),
        groupInfo: builder.query({
            query: ({id_user,id_group}) => ({
                url: `/user/${id_user}/get-group/${id_group}`
            })
        }),
        groupPosts: builder.query({
            query: ({id_user,id_group}) => ({
                url: `/user/${id_user}/group/${id_group}/posts`
            })
        }),
        profile: builder.query({
            query: ({username}) => ({
                url: `/profile/${username}`
            })
        })
    })
})

export const {
    useHomepageQuery,
    useFriendsQuery,
    useUserQuery,
    usePeoplepageQuery,
    useListgroupQuery,
    useGroupInfoQuery,
    useGroupPostsQuery,
    useProfileQuery
} = userApiSlice