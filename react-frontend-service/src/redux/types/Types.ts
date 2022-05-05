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
