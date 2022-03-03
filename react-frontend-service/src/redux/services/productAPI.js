import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: (language) => `/products?lang=${language}`,
      providesTags: ['Products'],
    }),

    getProductByID: build.query({
      query: (productID) => `/products/${productID}`,
      providesTags: ['Products'],
    }),

    createReview: build.mutation({
      query: ({ review, productId }) => ({
        url: `/products/${productId}/review`,
        method: 'PATCH',
        body: review,
      }),
      invalidatesTags: ['Products'],
    }),

    createProduct: build.mutation({
      query: (product) => ({
        url: '/admin/products',
        method: 'POST',
        body: product,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: build.mutation({
      query: (product, productID) => ({
        url: `/admin/products/${productID}`,
        method: 'PATCH',
        body: product,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: build.mutation({
      query: (productID) => ({
        url: `/admin/products/${productID}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    getProductsByParams: build.query({
      query: (sortBy, sortOrder, numberOfProductsOnPage, numberOfPages) =>
        `/products?sortBy=${sortBy}&sortOrder=${sortOrder}&numberOfProductsOnPage=${numberOfProductsOnPage}$numberOfPages=${numberOfPages}`,
      providesTags: ['Products'],
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductByIDQuery,
  useCreateReviewMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsByParamsQuery,
  useUpdateProductMutation,
} = productAPI
