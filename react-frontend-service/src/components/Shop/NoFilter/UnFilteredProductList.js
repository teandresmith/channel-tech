import React from 'react'
import { Grid, Stack, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UnFilteredProductList = ({ data }) => {
  const language = useSelector((state) => state.language.language)
  const products = useSelector((state) => state.product.value)
  const pagination = useSelector((state) => state.urlFilters.pagination)
  let pageProducts =
    products.length !== 0
      ? [...products].slice(
          pagination.dataskip,
          pagination.productsPerPage + pagination.dataskip
        )
      : [...data].slice(
          pagination.dataskip,
          pagination.productsPerPage + pagination.dataskip
        )

  return (
    <>
      <Grid container sx={{ minHeight: '85vh' }}>
        {pageProducts.length === 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant='h5' textAlign={'center'}>
                Sorry, we don't have any items that match your filters.
              </Typography>
            </Grid>
          </>
        )}

        {pageProducts.map((item) => (
          <Grid item xs={6} sm={4} md={3} key={`${item.name}+${item.price}`}>
            <Stack
              component={Link}
              to={`/products/${item.productId}`}
              direction='column'
              sx={{
                textDecoration: 'none',
                color: 'black',
                pl: 2,
                pr: 2,
                pb: 2,
              }}
            >
              <Box
                component='img'
                src={item.image}
                sx={{
                  height: { xs: 120, sm: 225 },
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant='body1'
                sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
              >
                {item.name}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                {item.subcategory}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                {language === 'en' ? '$' : '¥'}
                {item.price.toFixed(2)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UnFilteredProductList
