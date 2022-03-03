import React from 'react'
import Product from './Product'
import { Grid } from '@mui/material'

const Products = () => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
      </Grid>
    </>
  )
}

export default Products
