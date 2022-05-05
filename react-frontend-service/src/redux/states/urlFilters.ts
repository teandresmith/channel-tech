import { createSlice } from '@reduxjs/toolkit'
import { URLFilters } from '../types/Types'

const initialState: URLFilters = {
  filters: [],
  subFilters: [],
  pagination: {
    page: 1,
    dataskip: 0,
    productsPerPage: 20,
  },
}

export const urlFilters = createSlice({
  name: 'urlFilters',
  initialState,
  reducers: {
    setURLFilters: (state, action) => {
      state.filters = action.payload.filters
    },
    setSubFilters: (state, action) => {
      state.subFilters = action.payload.subFilters
    },
    setPagination: (state, action) => {
      const { page, dataskip } = action.payload

      state.pagination.page = page
      state.pagination.dataskip = dataskip
    },
  },
})

export const { setURLFilters, setSubFilters, setPagination } =
  urlFilters.actions

export default urlFilters.reducer
