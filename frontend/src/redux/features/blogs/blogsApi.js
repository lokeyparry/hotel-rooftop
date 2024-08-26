import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://parvejansarihotels07.vercel.app/api/',
        credentials: 'include'
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
            query: ({ search = '', category = '', location = '' }) => `/blogs?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blogs']
        }),
        fetchBlogById: builder.query({
            query: (id) => `/blogs/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `/blogs/related/${id}`
        }),
        postBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/blogs/create-post',
                method: 'POST',
                body: newBlog,
                credentials: 'include'
            }),
            invalidatesTags: ['Blogs']
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/blogs/update-post/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
        })
    })
})

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, useDeleteBlogMutation, useUpdateBlogMutation, usePostBlogMutation } = blogApi


// fetchBlogById:builder.query({
//     query:id=>({
//         url:`blogs/${id}`,
//         method:'GET'
//     }),
//     transformResponse:response=>response.data
// }),
// createBlog:builder.mutation({
//     query:blogData=>({
//         url:'blogs',
//         method:'POST',
//         body:JSON.stringify(blogData),
//         headers:{
//             'Content-Type':'application/json'
//         }
//     }),
//     invalidatesTags:['blogs']
// }),
// updateBlog:builder.mutation({
// query:updateData=>({
//     url:`blogs/${updateData.id}`,
//     method:'PUT',
//     body:JSON.stringify(updateData),
//     headers:{
//         'Content-Type':'application/json'
//     }
// }),
// invalidatesTag