import React from 'react'
import {
  Stack,
  Box,
  Typography,
  Select,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  FormControl,
  Divider,
  MenuItem,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addToCart, deleteFromCart } from '../../redux/states/cart'
import { Product } from '../../redux/types/Types'

type ProductsInfoProps = {
  data: Product
}

const ProductsInfo = ({ data }: ProductsInfoProps) => {
  const [desiredQuantity, setDesiredQuantity] = React.useState(1)

  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.value)

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 5 }}
        sx={{ width: '100%' }}
      >
        <Box component='div' sx={{ width: { xs: '100%', md: '60%' } }}>
          <Box
            component='img'
            src={data.image}
            sx={{
              width: '100%',
              height: { xs: '55vh', md: '85vh' },
              objectFit: { xs: 'contain', lg: 'contain' },
            }}
          />
        </Box>
        <Box component='div' sx={{ width: { xs: '100%', md: '40%' } }}>
          <Stack direction='column' spacing={0}>
            <Box component='div'>
              <Typography variant='h5'>{data.name}</Typography>
              <Typography variant='body1'>{data.brand}</Typography>
              <Typography variant='subtitle1'>{data.subcategory}</Typography>
            </Box>

            <Box component='div' sx={{ pt: 2, pb: 2 }}>
              <Typography variant='body2'>
                {data.language === 'en' ? '$' : '¥'}
                {data.price}
              </Typography>
              <Typography variant='body1'>(Tax Included)</Typography>
            </Box>

            <Box component='div' sx={{ pt: 1, pb: 2 }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id='desired-quantity'>Quantity</InputLabel>
                <Select
                  labelId='desired-quantity'
                  id='desired-quantity-select'
                  value={desiredQuantity}
                  label='Quantity'
                  onChange={(e) => setDesiredQuantity(Number(e.target.value))}
                  sx={{ width: { xs: '30%', md: '40%' } }}
                >
                  {Array.from(Array(data.quantityInStock).keys()).map(
                    (index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box component='div' sx={{ pt: 1, pb: 3 }}>
              {!cart.find((item) => item.product.name === data.name) ? (
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    borderRadius: 3,
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        info: {
                          product: data,
                          quantity: desiredQuantity,
                        },
                        cart: [...cart],
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    borderRadius: 3,
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={() =>
                    dispatch(
                      deleteFromCart({
                        info: { product: data },
                        cart: [...cart],
                      })
                    )
                  }
                >
                  Remove from Cart
                </Button>
              )}
            </Box>
            <Box component='div' sx={{ pb: 2 }}>
              <Typography variant='subtitle1'>{data.description}</Typography>
            </Box>
          </Stack>
          <Divider />
          <Box component='div' sx={{ pt: 1, pb: 2 }}>
            <Accordion sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: 'black' }} />}
              >
                <Typography variant='h6'>
                  {data.language === 'en' ? 'Shipping Details' : '配達詳細'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.language === 'en'
                  ? 'Item will typically be shipped within 3-5 business days. If your order is over $100, shipping will be free!'
                  : '商品は通常3-5営業日以内に発送されます。ご注文が100ドルを超える場合、送料は無料になります。'}
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ backgroundColor: 'white', boxShadow: 'none', pt: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: 'black' }} />}
              >
                <Typography variant='h6'>
                  {data.language === 'en' ? 'Return Policy' : '返品規則'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.language === 'en'
                  ? 'All items returned within 30 days of purchase are subjected to a full refund. If the item has been opened, then store credit will be issued. If it has not been opened, the payment will be refunded in the form of payment (ex. Credit, Debit, Cash)'
                  : '購入から30日以内に返品されたすべてのアイテムは全額返金されます。アイテムが開かれている場合は、ストアクレジットが発行されます。開封されていない場合、支払いは支払いの形で返金されます（例：クレジット、デビット、現金）'}
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default ProductsInfo
