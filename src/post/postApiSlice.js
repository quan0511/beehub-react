
import { apiSlice } from "../api/apiSlice";

const POST_URL = "/posts"

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchPost: builder.query({
            query: ({ id }) => ({
                url: POST_URL+ `/${ id }`,
            }),
            
            providesTags: ['Post']
        }),
        comment: builder.query({
            query: ({id}) => ({
                url: POST_URL + '/comment' + `/${id}`,
            }),
            providesTags: ['comment']
        }),
        commentById: builder.query({
            query: ({id}) => ({
                url: POST_URL + '/commentpost' + `/${id}`,
            }),
            providesTags: ['commentbyid']
            // transformErrorResponse: (error) => {
            //             console.log(error)
            //             return error
            //         },
            //         transformResponse: (response) => {
            //             console.log(response)
            //             return response
            //         }
        }),
        countComment:builder.query({
            query:({id}) =>({
                url: POST_URL + '/comment/post' + `/${id}`,
            }),
            providesTags: ['countcomment']
        }),
        getUser: builder.query({
            query: () => ({
                url: POST_URL + '/user',
            })
        }),
        recommentPost: builder.query({
            query: ({id}) => ({
                url: POST_URL + '/recommentpost' + `/${id}`,
            }),
            providesTags: ['recommentpost']
            // transformErrorResponse: (error) => {
            //     console.log(error)
            //     return error
            // },
            // transformResponse: (response) => {
            //     console.log(response)
            //     return response
            // },
        }),
        recomment: builder.query({
            query: ({id}) => ({
                url: POST_URL + '/recomment' + `/${id}`,
            }),
            providesTags: ['recomment']
        }),
        checkLike: builder.query({
            query: ({userid,postid}) =>({
                url: POST_URL + '/check'+ `/${userid}`+`/${postid}`,
            }),
            providesTags: ['checkLike']
        }),
        getEnumEmo:builder.query({
            query:({userid,postid}) =>({
                url: POST_URL+ '/getenum'+ `/${userid}`+`/${postid}`,
                responseHandler: (response) => response.text()
            }),
            providesTags: ['EnumEmo']
            // transformErrorResponse: (error) => {
            //     console.log(error)
            //     return error
            // },
            // transformResponse: (response) => {
            //     console.log(response)
            //     return response
            // }
        }),
        getEmoPostByEnum:builder.query({
            query:({postid,emoji})=>({
                url: POST_URL + '/emo'+`/${postid}`+`/${emoji}`,
            }),
            // transformErrorResponse: (error) => {
            //     console.log(error)
            //     return error
            // },
            // transformResponse: (response) => {
            //     console.log(response)
            //     return response
            // },
            providesTags: ['EmoPostByEnum']
        }),
        countLike:builder.query({
            query:({id})=>({
                url:POST_URL + '/like/user'+`/${id}`,
            }),
            providesTags: ['CountLike']
        }),
        countShare:builder.query({
            query:({id}) =>({
                url:POST_URL + '/countshare' + `/${id}`
            }),
            providesTags: ['CountShare']
        }),
        countReaction:builder.query({
            query:({id}) =>({
                url: POST_URL + '/recomment/comment' + `/${id}`,
            }),
            providesTags: ['CountReaction']
        }),
        countReactionByPost:builder.query({
            query:({id}) =>({
                url: POST_URL + '/reaction/post' + `/${id}`,
            }),
            providesTags: ['CountReactionByPost']
        }),
        getUserFriend:builder.query({
            query:({id}) =>({
                url: POST_URL + '/user/friend' + `/${id}`,
            }),
        }),
        getLikeUser:builder.query({
            query:({id})=>({
                url:POST_URL + '/like'+ `/${id}`
            }),
            providesTags: ['LikeUser']
            // transformErrorResponse: (error) => {
            //         console.log(error)
            //         return error
            //     },
            //     transformResponse: (response) => {
            //         console.log(response)
            //         return response
            //     }
        }),
        post: builder.mutation({
            query: ({text, color, background, user, medias,group}) => {
                var bodyFormData = new FormData();
                bodyFormData.append('text', text);
                bodyFormData.append('color', color);
                bodyFormData.append('background', background);
                bodyFormData.append('user', user);
                bodyFormData.append('medias', medias);
                bodyFormData.append('group', group);
                return {
                    url: POST_URL + '/create',
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                }
            },     
        }),
        updatePost: builder.mutation({
            query: ({id,text, color, background, user, medias,group}) => {
                var bodyFormData = new FormData();
                bodyFormData.append('id', id);
                bodyFormData.append('text', text);
                bodyFormData.append('color', color);
                bodyFormData.append('background', background);
                bodyFormData.append('user', user);
                bodyFormData.append('medias', medias);
                bodyFormData.append('group', group);
                return {
                    url: POST_URL + '/updatepost',
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                }
            },
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: POST_URL + `/deletepost/${id}`,
                method: 'POST',
            })
        }),
        postComment: builder.mutation({
            query: comment => ({
                url: POST_URL + `/comment/create`,
                method: 'POST',
                body: { ...comment }
            })
        }),
        updateComment: builder.mutation({
            query: comment => ({
                url: POST_URL + `/comment/edit`,
                method: 'POST',
                body: { ...comment }
            }),
        }),
        deletePostComment: builder.mutation({
            query: ({id}) => ({
                url: POST_URL + `/comment/delete/${id}`,
                method: 'POST',
            })
        }),
        postReComment: builder.mutation({
            query: recomment => ({
                url: POST_URL + `/recomment/create`,
                method: 'POST',
                body: { ...recomment }
            })
        }),
        updateReComment: builder.mutation({
            query: recomment => ({
                url: POST_URL + `/recomment/update`,
                method: 'POST',
                body: { ...recomment }
            })
        }),
        deletePostReComment: builder.mutation({
            query: ({id}) => ({
                url: POST_URL + `/recomment/delete/${id}`,
                method: 'POST',
            })
        }),
        addLikePost: builder.mutation({
            query: likePost =>({
                url: POST_URL + `/like/create`,
                method: 'POST',
                body: { ...likePost}
            }),
            invalidatesTags: ['Post', 'CheckLike', 'EnumEmo', 'CountLike', 'LikeUser']
        }),
        updateLikePost: builder.mutation({
            query:likePost => ({
                url: POST_URL + `/like/update`,
                method:'POST',
                body: {...likePost}
            }),
            invalidatesTags: ['Post', 'CheckLike', 'EnumEmo', 'CountLike', 'LikeUser']
        }),
        deleteLike: builder.mutation({
            query: ({id, postId}) =>({
                url:POST_URL + `/like/remove/${id}/${postId}`,
                method:'POST',
            }),
            invalidatesTags: ['Post', 'CheckLike', 'EnumEmo', 'CountLike', 'LikeUser']
        }),
        sharePost: builder.mutation({
            query: sharePost => ({
                url: POST_URL + `/share`,
                method: 'POST',
                body: {...sharePost}
            }),
  
        }),
    })
})

export const {
    useFetchPostQuery,
    useCommentQuery,
    useCommentByIdQuery,
    useRecommentQuery,
    useRecommentPostQuery,
    useCheckLikeQuery,
    useCountLikeQuery,
    useCountReactionQuery,
    useGetEmoPostByEnumQuery,
    useGetEnumEmoQuery,
    useGetLikeUserQuery,
    useGetUserQuery,
    useCountCommentQuery,
    useCountShareQuery,
    useCountReactionByPostQuery,
    useGetUserFriendQuery,

    usePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddLikePostMutation,
    useUpdateLikePostMutation,
    useDeleteLikeMutation,
    usePostReCommentMutation,
    useUpdateReCommentMutation,
    useDeletePostReCommentMutation,
    usePostCommentMutation,
    useUpdateCommentMutation,
    useDeletePostCommentMutation,
    useSharePostMutation

} = postApiSlice




