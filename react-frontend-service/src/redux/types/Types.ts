import { StaticData } from '../../assets/data/data'

export type Product = {
  brand: string
  category: string
  createdAt: string
  description: string
  image: string
  language: string
  name: string
  price: number
  productId: string
  quantityInStock: string
  reviews: Array<{
    comment: string
    createdAt: string
    name: string
    rating: number
    reviewId: string
    updatedAt: string
    _id: string
  }> | null
  subcategory: string
  tag: string
  updatedAt: string
  _id: string
}

export type Cart = {
  product: Product
  quantity: number
}

export type Language = {
  language: string | null
  languageData: StaticData
}

export type URLFilters = {
  filters: Array<any>
  subFilters: Array<any>
  pagination: { page: number; dataskip: number; productsPerPage: number }
}

export type User = {
  user: {
    _id?: string
    firstName?: string
    lastName?: string
    email?: string
    Password?: string
    orders?: Array<Order>
    defaultAddress?: Address
    userType?: string
    userId?: string
    token?: string
    refreshToken?: string
    createdAt?: string
    updatedAt?: string
  } | null
}

export type Order = {
  _id: string
  firstName: string
  lastname: string
  paymentMethod: string
  shippingAddress: Address
  orderItems: Array<{ quantity: number; product: Product }>
  totalPrice: number
  isPaid: string
  orderId: string
  createdAt: string
  updatedAt: string
}

export type Address = {
  streetAddress: string
  city: string
  statePrefecture: string
  country: string
  postalCode: string
}
