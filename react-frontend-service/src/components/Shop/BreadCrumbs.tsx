import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const BreadCrumbs = () => {
  const language = useAppSelector((state) => state.language.language)

  let [searchParams] = useSearchParams()
  let category = searchParams.get('category')
  let subCategory = searchParams.get('subcategory')
  let subFilters = searchParams.get('subfilters')

  const checkURL = () => {
    let productCategory = false

    let dataArray = []

    if (!category) return

    switch (category) {
      case 'Featured Products':
      case 'Newest Products':
      case 'Top Rated Products':
      case 'おすすめ商品':
      case '新しい商品':
      case '一番商品':
        productCategory = true
        break
      default:
        break
    }

    if (productCategory && !subFilters) {
      dataArray.push({
        url: `/shop?category=${category}&lang=${language}`,
        text: category,
      })
    }

    if (productCategory && subFilters) {
      dataArray.push(
        {
          url: `/shop?category=${category}&lang=${language}`,
          text: category,
        },
        {
          url: `/shop?category=${category}&subFilters=${subFilters}&lang=${language}`,
          text: subFilters,
        }
      )
    }

    if (subCategory && !subFilters) {
      dataArray.push(
        {
          url: `/shop?category=${category}&subcategory=Shop All&lang=${language}`,
          text: category,
        },
        {
          url: `/shop?category=${category}&subcategory=${subCategory}&lang=${language}`,
          text: subCategory,
        }
      )
    }

    if (category && subCategory && subFilters) {
      dataArray.push(
        {
          url: `/shop?category=${category}&subcategory=Shop All&lang=${language}`,
          text: category,
        },
        {
          url: `/shop?category=${category}&subcategory=${subCategory}&lang=${language}`,
          text: subCategory,
        },
        {
          url: `/shop?category=${category}&subcategory=${subCategory}&subfilters=${subFilters}&lang=${language}`,
          text: subFilters,
        }
      )
    }

    return dataArray.map((item, index) => (
      <Typography
        component={Link}
        to={item.url}
        sx={{ textDecoration: 'none', color: 'black' }}
        key={index}
      >
        {item.text}
      </Typography>
    ))
  }

  return (
    <>
      <Breadcrumbs>
        <Typography
          component={Link}
          to='/shop'
          sx={{ textDecoration: 'none', color: 'black' }}
        >
          Shop
        </Typography>
        {checkURL()}
      </Breadcrumbs>
    </>
  )
}

export default BreadCrumbs
