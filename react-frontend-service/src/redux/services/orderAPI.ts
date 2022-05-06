import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_DOMAIN}/api`,
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
