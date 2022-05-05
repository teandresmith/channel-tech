import React from 'react'
import { Container, Stack, Box, Typography } from '@mui/material'
import CartItems from '../Cart/CartItems'
import CartInfo from '../Cart/CartInfo'
import { useAppSelector } from '../../hooks/reduxHooks'

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.value)
  const language = useAppSelector((state) => state.language.language)

  return (
    <>
      <Container maxWidth='lg'>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{ width: '100%' }}
        >
          <Box component='div' sx={{ width: { xs: '100%', md: '70%' } }}>
            <Typography variant='h5' sx={{ pb: 1 }}>
              {language === 'en' ? 'Cart Items' : 'カート'}
            </Typography>
            {cart.length === 0 ? (
              <Typography variant='h6'>
                {language === 'en'
                  ? 'Your cart is currently empty...'
                  : 'カートに商品はありません'}
              </Typography>
            ) : (
              <CartItems />
            )}
          </Box>
          <Box
            component='div'
            sx={{
              width: { xs: '100%', md: '30%' },
              position: { xs: 'inherit', md: 'sticky' },
              top: 100,
              height: { xs: '100%', md: '85vh' },
              pb: { xs: 3, md: 0 },
            }}
          >
            <CartInfo />
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default Cart
