import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: (build) => ({
    getUserByID: build.query({
      query: (userID) => ({
        url: `/users/${userID}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: ({ user, userID }) => ({
        url: `/users/${userID}`,
        method: 'PATCH',
        body: user,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    sendMessage: build.mutation({
      query: (message) =>
        build.mutation({
          url: '/contact',
          method: 'POST',
          body: message,
        }),
    }),
  }),
})

export const {
  useGetUserByIDQuery,
  useUpdateUserMutation,
  useSendMessageMutation,
} = userAPI
