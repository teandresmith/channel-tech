import React from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import ProductsInfo from '../ProductDetails/ProductsInfo'
import Reviews from '../ProductDetails/Reviews'
import { useGetProductByNameQuery } from '../../redux/services/productAPI'
import Loading from '../Loading'
import ServerError from './ServerError'
import { useSelector } from 'react-redux'

const ProductDetails = () => {
  const params = useParams('name')

  const language = useSelector((state) => state.language.language)
  console.log(language)
  const { data, isLoading, error, refetch } = useGetProductByNameQuery({
    name: params.name,
    language,
  })

  React.useEffect(() => {
    refetch()
  }, [language])

  return (
    <>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : error ||
        (data && Object.keys(data.result) === 0) ||
        data?.results?.length === 0 ? (
        <ServerError />
      ) : (
        <Container maxWidth='lg' sx={{}}>
          <ProductsInfo data={data.result[0]} />
          <Reviews data={data.result[0]} />
        </Container>
      )}
    </>
  )
}

export default ProductDetails
