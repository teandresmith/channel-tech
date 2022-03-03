import React from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import ProductsInfo from '../ProductDetails/ProductsInfo'
import Reviews from '../ProductDetails/Reviews'
import { useGetProductByIDQuery } from '../../redux/services/productAPI'
import Loading from '../Loading'
import ServerError from './ServerError'

const ProductDetails = () => {
  const params = useParams('productid')
  const { data, isLoading, error } = useGetProductByIDQuery(params.productid)

  return (
    <>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : error || (data && Object.keys(data.result) === 0) ? (
        <ServerError />
      ) : (
        <Container maxWidth='lg' sx={{}}>
          <ProductsInfo data={data.result} />
          <Reviews data={data.result} />
        </Container>
      )}
    </>
  )
}

export default ProductDetails
