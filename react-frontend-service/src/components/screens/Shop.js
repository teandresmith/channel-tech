import React, { useEffect } from 'react'
import { Container } from '@mui/material'

import { useSearchParams } from 'react-router-dom'
import Filtered from '../Shop/Filtered'
import NoFilter from '../Shop/NoFilter'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterProductByTagAndSubfilters,
  filterProductsByCategory,
  filterProductsBySubCategory,
  filterProductsBySubFilter,
  filterProductsByTag,
} from '../../redux/states/productState'
import BreadCrumbs from '../Shop/BreadCrumbs'

const Shop = ({ data }) => {
  const languageData = useSelector((state) => state.language.languageData)

  let [searchParams] = useSearchParams()
  let shopFilter = searchParams.get('filter')
  let category = searchParams.get('category')
  let subCategory = searchParams.get('subcategory')
  let subFilters = searchParams.get('subfilters')

  const dispatch = useDispatch()

  const checkShopParams = () => {
    let payload = {}

    if (category && !subCategory) {
      if (languageData.Shop.Products.find((item) => item === category)) {
        if (subFilters) {
          payload = {
            tag: category,
            subFilters: subFilters,
            products: [...data],
          }
          dispatch(filterProductByTagAndSubfilters(payload))
          return
        }

        payload = { tag: category, products: [...data] }
        dispatch(filterProductsByTag(payload))
        return
      }

      payload = { category: category, products: [...data] }
      dispatch(filterProductsByCategory(payload))
      return
    }

    if (category && subCategory) {
      if (subFilters) {
        payload = {
          category: category,
          subCategory: subCategory,
          subFilters: subFilters,
          products: [...data],
        }
        dispatch(filterProductsBySubFilter(payload))
        return
      }

      payload = {
        category: category,
        subCategory: subCategory,
        products: [...data],
      }

      dispatch(filterProductsBySubCategory(payload))
    }
  }

  useEffect(() => {
    if (category) {
      checkShopParams()
    }
  }, [category, searchParams])

  return (
    <>
      <Container maxWidth='xl' sx={{ height: '100%' }}>
        <BreadCrumbs shopFilter={shopFilter} />
        {category ? <Filtered /> : <NoFilter data={data} />}
      </Container>
    </>
  )
}

export default Shop
