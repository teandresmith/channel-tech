import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: (build) => ({
    makeNewOrder: build.mutation({
      query: (order) => ({
        url: '/order/new',
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useMakeNewOrderMutation } = orderAPI
