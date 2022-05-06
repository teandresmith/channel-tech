import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_DOMAIN}/api`,
  }),
  endpoints: (build) => ({
    getUserByID: build.query({
      query: ({ userID, headers }) => ({
        url: `/users/${userID}`,
        method: 'GET',
        headers: headers,
      }),
      providesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: ({ user, userID, headers }) => ({
        url: `/users/${userID}`,
        method: 'PATCH',
        body: user,
        headers: headers,
      }),
      invalidatesTags: ['User'],
    }),

    sendMessage: build.mutation({
      query: (message) => ({
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
