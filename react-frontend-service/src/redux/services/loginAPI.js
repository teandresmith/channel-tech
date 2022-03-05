import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_JWT_DOMAIN,
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),

    login: build.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = loginAPI
