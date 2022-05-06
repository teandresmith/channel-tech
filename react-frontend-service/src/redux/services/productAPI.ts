import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productAPI = createApi({
  reducerPath: 'productAPI',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_DOMAIN}/api`,
  }),
  endpoints: (build) => ({
    getAllProducts: build.mutation({
      query: (language) => ({
        url: `/products?lang=${language}`,
        method: 'GET',
        providesTags: 'Products',
      }),
    }),

    getProductByID: build.query({
      query: (productID) => `/products/${productID}`,
      providesTags: ['Products'],
    }),

    getProductByName: build.query({
      query: ({ name, language }) =>
        `/products/product/${name}?lang=${language}`,
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
      query: ({ product, productID }) => ({
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
  }),
})

export const {
  useGetAllProductsMutation,
  useGetProductByIDQuery,
  useGetProductByNameQuery,
  useCreateReviewMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productAPI
