import React from 'react'
import { Stack, Box, Typography, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const CartInfo = () => {
  const cart = useAppSelector((state) => state.cart.value)
  const language = useAppSelector((state) => state.language.language)

  const calculateCartTotal = () => {
    if (cart.length === 0) {
      return 0
    }
    const total = cart.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.product.price * currentValue.quantity,
      0
    )

    return total
  }

  const [total, setTotal] = React.useState(0)

  const [shippingPrice, setShippingPrice] = React.useState(0)

  const addShipping = (num1: number, num2: number) => {
    return num1 + num2
  }

  React.useEffect(() => {
    setTotal(calculateCartTotal())
    if (calculateCartTotal() > 500 || cart.length === 0) {
      setShippingPrice(0)
    } else {
      setShippingPrice(5)
    }
  }, [cart, total])

  return (
    <>
      <Stack>
        <Box component='div' sx={{ pb: 2 }}>
          <Typography variant='h5'>
            {language === 'en' ? 'Order' : 'ご注文金額'}
          </Typography>
        </Box>
        <Stack direction='row' justifyContent={'space-between'} sx={{ pb: 1 }}>
          <Typography variant='subtitle1'>
            {language === 'en' ? 'Subtotal' : '小計'}
          </Typography>
          <Typography variant='subtitle1'>
            {language === 'en'
              ? `$${total.toFixed(2)}`
              : `¥${total.toFixed(2)}`}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} sx={{ pb: 1 }}>
          <Typography variant='subtitle1'>
            {language === 'en' ? 'Shipping Fee' : '配送手数料'}
          </Typography>
          <Typography variant='subtitle1'>
            {language === 'en'
              ? `$${shippingPrice.toFixed(2)}`
              : `¥${shippingPrice.toFixed(2)}`}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction='row'
          justifyContent={'space-between'}
          sx={{ pb: 1, pt: 1 }}
        >
          <Typography variant='subtitle1'>
            {language === 'en' ? 'Total (tax included)' : '合計 (税込)'}
          </Typography>
          <Typography variant='subtitle1'>
            {language === 'en' ? '$' : '¥'}
            {addShipping(total, shippingPrice).toFixed(2)}
          </Typography>
        </Stack>
        <Divider />
        <Box component='div' sx={{ width: '100%', pt: 2 }}>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/checkout'
            disabled={cart.length === 0}
            sx={{
              width: '100%',
              borderRadius: 4,
              color: 'white',
              backgroundColor: 'black',
            }}
          >
            Checkout
          </Button>
        </Box>
      </Stack>
    </>
  )
}

export default CartInfo
