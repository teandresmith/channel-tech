import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../types/Types'

interface ProductInitialState {
  value: Array<Product>
}

const initialState: ProductInitialState = {
  value: [],
}

const filterHelper = (
  category?: string,
  subCategory?: string,
  products?: Array<Product>,
  subFilter?: string
) => {
  const categoryItems = products?.filter(
    (product) => product.category === category
  )

  if (!subCategory) {
    return categoryItems
  } else if (subCategory === 'Shop All' && !subFilter) {
    return categoryItems
  }

  if (subCategory === 'Shop All') {
    const value = checkMultipleParamsHelper(categoryItems, subFilter)
    return value
  }

  const filteredItems = categoryItems?.filter(
    (product) => product.subcategory === subCategory
  )

  if (!subFilter) {
    return filteredItems
  }

  return checkMultipleParamsHelper(filteredItems, subFilter)
}

const checkMultipleParamsHelper = (array: any, subFilter: any) => {
  if (subFilter.length !== 1) {
    subFilter = subFilter.map((items: any) =>
      items.split('*', 2)[0] === 'Brands'
        ? items.split('*', 2)[1]
        : parseInt(items.split('*', 2)[1])
    )

    const brands = [...subFilter].filter((item) => typeof item === 'string')
    const prices = [...subFilter].filter((item) => typeof item === 'number')

    const brandFilter = array.filter((product: any) => {
      if (
        brands.find(
          (value) => value.toUpperCase() === product.brand.toUpperCase()
        )
      ) {
        return true
      }
      return false
    })

    if (prices.length === 0) {
      return brandFilter
    }

    const priceFilter = brandFilter.filter(
      (product: any) => prices[0] >= parseInt(product.price)
    )

    return priceFilter
  }

  return array.filter(
    (product: any) =>
      product.brand === subFilter[0].split('*', 2)[1] ||
      parseInt(subFilter[0].split('*', 2)[1]) > parseInt(product.price)
  )
}

const filterByTagHelper = (
  tag: string,
  products: Array<Product>,
  subFilter?: any
) => {
  const tagItems = products.filter((product) => product.tag === tag)

  if (!subFilter) {
    return tagItems
  }

  return checkMultipleParamsHelper(tagItems, subFilter)
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const { category, products } = action.payload

      state.value = filterHelper(category, products)
    },
    filterProductsBySubCategory: (state, action) => {
      const { category, subCategory, products } = action.payload

      state.value = filterHelper(category, subCategory, products)
    },
    filterProductsBySubFilter: (state, action) => {
      const { category, subCategory, subFilters, products } = action.payload

      let splitFilters = subFilters.split(',')

      state.value = filterHelper(category, subCategory, products, splitFilters)
    },
    filterProductsByTag: (state, action) => {
      const { tag, products } = action.payload

      state.value = filterByTagHelper(tag, products)
    },
    filterProductByTagAndSubfilters: (state, action) => {
      const { tag, products, subFilters } = action.payload

      let subFilter = subFilters.split(',')

      state.value = filterByTagHelper(tag, products, subFilter)
    },
    sortProducts: (state, action) => {
      const sortBy = action.payload.sortBy
      const products = [...action.payload.products]

      switch (sortBy) {
        case 'A-Z'.toUpperCase():
          state.value = products.sort((a, b) => {
            if (a.name < b.name) return -1

            if (a.name > b.name) return 1

            return 0
          })
          break
        case 'Z-A'.toUpperCase():
          state.value = products.sort((a, b) => {
            if (a.name > b.name) return -1

            if (a.name < b.name) return 1

            return 0
          })
          break
        case 'Price (low)'.toUpperCase():
          state.value = products.sort((a, b) => a.price - b.price)
          break
        case 'Price (high)'.toUpperCase():
          state.value = products.sort((a, b) => b.price - a.price)
          break
        case 'None':
          state.value = products
          break
        default:
          state.value = products
          break
      }
    },
    clearProducts: (state, action) => {
      state.value = []
    },
  },
})

export const {
  filterProductsByCategory,
  filterProductsBySubCategory,
  filterProductsBySubFilter,
  filterProductsByTag,
  filterProductByTagAndSubfilters,
  sortProducts,
  clearProducts,
} = productSlice.actions

export default productSlice.reducer
