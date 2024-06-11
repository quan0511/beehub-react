import { useSelector } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { selectCurrentToken, setCredentials } from '../auth/authSlice'
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
            merge: (currentCache, newItems,{arg: arg}) => {
                if(!arg.reset){
                    currentCache.push(...newItems)
                }else{
                    return newItems;
                }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
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
            query: ({id_user,id_group,page}) => ({
                url: `/user/${id_user}/group/${id_group}/posts?limit=3&page=${page}`
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
        getReportTypes: builder.query({
            query: ()=>({
                url: `/report-type`
            })
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
        }),
        getPost: builder.query({
            query: ({id_user,id_post})=>({
                url: `/user/${id_user}/get-post/${id_post}`
            })
        }),
        getNotitfication: builder.query({
            query: ({id, reset})=>({
                url: `/user/request/${id}`
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
                },
        }),
        uploadImageProfile: builder.mutation({
            query: ({id, image})=>{
                var bodyFormData = new FormData();
                bodyFormData.append('media', image);
                return {
                    url: '/upload/profile/image/'+id,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                }
            }
        }),
        uploadBackgroundProfile: builder.mutation({
            query: ({id, background})=>{
                var bodyFormData = new FormData();
                bodyFormData.append('media', background);
                return {
                    url: '/upload/profile/background/'+id,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                }
            }
        }),
        uploadImageGroup: builder.mutation({
            query: ({id,id_group,image}) => {
                var bodyFormData = new FormData();
                bodyFormData.append("id",id_group),
                bodyFormData.append('media',image);
                return {
                    url: '/upload/group/image/'+id,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true
                }
            }
        }),
        uploadBgGroup: builder.mutation({
            query: ({id,id_group,background}) => {
                var bodyFormData = new FormData();
                bodyFormData.append("id",id_group),
                bodyFormData.append('media',background);
                return {
                    url: '/upload/group/background/'+id,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true
                }
            }
        }),
        createGroup: builder.mutation({
            query: ({id,data})=>{
                return {
                    url: '/user/create-group/'+id,
                    method: 'POST',
                    body: data,
                    formData: true
                }
            }
        }),
        createReport: builder.mutation({
            query: ({id,data})=>{
                console.log(data);
                return {
                    url: "/user/create-report/"+id,
                    method: "POST",
                    body: data
                }
            }
        }),
        settingPost: builder.mutation({
            query: ({id,data})=>{
                return {
                    url: `/user/${id}/setting/post`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['Post']
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
    useGetReportTypesQuery,
    useProfileQuery,
    useCheckUsernameQuery,
    useCheckSetUpPostsQuery,
    useGetSettingItemsQuery,
    useGetFriendsAndGroupQuery,
    useSearchingQuery,
    useGetPostQuery,
    useGetNotitficationQuery,
    useUploadImageProfileMutation,
    useUploadBackgroundProfileMutation,
    useUploadImageGroupMutation,
    useUploadBgGroupMutation,
    useCreateGroupMutation, 
    useCreateReportMutation,
    useSettingPostMutation
} = userApiSlice