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
            query: ({id,username}) => ({
                url: `/user/${id}/profile/${username}`
            })
        }),
        checkUsername: builder.query({
            query: ({username})=>({
                url: `/check-user?username=${username}`
            })
        }),
        checkSetUpPosts: builder.query({
            query: ({id})=>({
                url: `/check-setting/post/${id}`
            })
        }),
        getSettingItems: builder.query({
            query: ({id}) => ({
                url: `/get-setting/item/${id}`
            })
        }),
        getFriendsAndGroup: builder.query({
            query: ({id})=>({
                url: `/groups_friends/${id}`
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
    useProfileQuery,
    useCheckUsernameQuery,
    useCheckSetUpPostsQuery,
    useGetSettingItemsQuery,
    useGetFriendsAndGroupQuery
} = userApiSlice