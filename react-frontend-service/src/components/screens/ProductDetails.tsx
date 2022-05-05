import React from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import ProductsInfo from '../ProductDetails/ProductsInfo'
import Reviews from '../ProductDetails/Reviews'
import { useGetProductByNameQuery } from '../../redux/services/productAPI'
import Loading from '../Loading'
import ServerError from './ServerError'
import { useAppSelector } from '../../hooks/reduxHooks'

const ProductDetails = () => {
  const params = useParams()

  const language = useAppSelector((state) => state.language.language)

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
        <Loading />
      ) : error || data?.results?.length === 0 ? (
        <ServerError />
      ) : (
        <Container maxWidth='lg'>
          <ProductsInfo data={data?.result[0]} />
          <Reviews data={data?.result[0]} />
        </Container>
      )}
    </>
  )
}

export default ProductDetails
