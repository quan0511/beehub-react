import { useSelector } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from '../auth/authSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        homepage: builder.query({
            query: arg => ({
                url: '/homepage/'+arg.id+"?page="+arg.page+"&limit="+3
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
            currentCache.push(...newItems)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
            },
        }),
        friends: builder.query({
            query: ({id}) => ({
                url: '/friends/'+id
            }),
            forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
            },
        }),
        user : builder.query({
            query: ({id}) => ({
                url: '/user/'+id,
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
                },
        }),
        peoplepage: builder.query({
            query: arg => ({
                url: `/peoplepage/${arg.id}`
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
                }
        }),
        listgroup: builder.query({
            query: arg =>({
                url : `/listgroup_page/${arg.id}`
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
                }
        }),
        groupInfo: builder.query({
            query: ({id_user,id_group}) => ({
                url: `/user/${id_user}/get-group/${id_group}`
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
                },
        }),
        groupPosts: builder.query({
            query: ({id_user,id_group}) => ({
                url: `/user/${id_user}/group/${id_group}/posts`
            })
        }),
        profile: builder.query({
            query: ({id,username}) => ({
                url: `/user/${id}/profile/${username}`
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
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
            }),
            forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
            },
        }),
        searching: builder.query({
            query: ({id,search,reset})=>({
                url: `/user/${id}/search_all?search=${search}`
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            
            forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
            },
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
    useGetFriendsAndGroupQuery,
    useSearchingQuery
} = userApiSlice