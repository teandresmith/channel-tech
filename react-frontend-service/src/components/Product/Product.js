import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const Product = ({ products }) => {
  return (
    <>
      <Box component='div'>
        <Stack direction='column'>
          <img
            // style={{ maxWidth: '250px' }}
            src='https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            alt='iPhone'
          />
          <Typography variant='body2'>Apple IPhone</Typography>
          <Typography variant='body2'>Mobile Device</Typography>
          <Typography variant='body2'>$999.99</Typography>
        </Stack>
      </Box>
    </>
  )
}

export default Product
