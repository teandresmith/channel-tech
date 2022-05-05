import React from 'react'
import { Container } from '@mui/material'

import { useSearchParams } from 'react-router-dom'
import Filtered from '../Shop/Filtered'
import NoFilter from '../Shop/NoFilter'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  filterProductByTagAndSubfilters,
  filterProductsByCategory,
  filterProductsBySubCategory,
  filterProductsBySubFilter,
  filterProductsByTag,
} from '../../redux/states/productState'
import BreadCrumbs from '../Shop/BreadCrumbs'
import { Product } from '../../redux/types/Types'

type ShopProps = {
  data: Array<Product>
}

const Shop = ({ data }: ShopProps) => {
  const languageData = useAppSelector((state) => state.language.languageData)

  let [searchParams] = useSearchParams()
  let category = searchParams.get('category')
  let subCategory = searchParams.get('subcategory')
  let subFilters = searchParams.get('subfilters')

  const dispatch = useAppDispatch()

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

  React.useEffect(() => {
    if (category) {
      checkShopParams()
    }
  }, [category, searchParams])

  return (
    <>
      <Container maxWidth='xl' sx={{ height: '100%' }}>
        <BreadCrumbs />
        {category ? <Filtered /> : <NoFilter data={data} />}
      </Container>
    </>
  )
}

export default Shop
