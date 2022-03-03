import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Stack,
  Box,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/states/cart'

const CartItems = () => {
  const cart = useSelector((state) => state.cart.value)
  const language = useSelector((state) => state.language.language)

  const loadQuantities = () => {
    let data = {}
    for (var i = 0; i < cart.length; i++) {
      data = { ...data, [i]: cart[i].quantity }
    }
    return data
  }

  const [quantities, setQuantities] = useState(loadQuantities())

  const dispatch = useDispatch()

  const handleQuantityChange = (index, quantity, item) => {
    setQuantities((prevState) => ({ ...prevState, [index]: quantity }))
    dispatch(
      addToCart({
        info: {
          product: item.product,
          quantity: quantity,
        },
        cart: [...cart],
      })
    )
  }

  const handleDelete = (item) => {
    dispatch(
      deleteFromCart({
        info: {
          product: item.product,
        },
        cart: [...cart],
      })
    )
  }

  return (
    <>
      {cart.map((item, index) => (
        <Stack
          key={item.product.productId}
          direction={'column'}
          sx={{ width: '100%', pr: { xs: 0, md: 3 }, pb: { xs: 2, md: 3 } }}
        >
          <Box
            component='div'
            sx={{
              width: '100%',
              pt: 2,
              border: '1px solid lavender',
              borderRadius: 2,
            }}
          >
            <Stack
              direction='row'
              sx={{ width: '100%', height: '100%', pr: { xs: 0, md: 2 } }}
            >
              <Box
                component='img'
                src={item.product.image}
                sx={{
                  width: { xs: 130, sm: 175 },
                  height: { xs: 130, sm: 175 },
                  objectFit: 'contain',
                  pl: 2,
                  pr: 2,
                  pb: { xs: 0, sm: 2 },
                }}
              />
              <Stack
                direction='row'
                justifyContent={'space-between'}
                sx={{ width: '100%' }}
              >
                <Stack
                  direction='column'
                  spacing={1}
                  sx={{ pl: { xs: 0, md: 6 } }}
                >
                  <Typography variant='h6' fontSize={{ xs: 12, sm: 18 }}>
                    {item.product.brand}
                  </Typography>
                  <Typography variant='h5' fontSize={{ xs: 16, sm: 22 }}>
                    {item.product.name}
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0, sm: 2 }}
                    alignItems={{ xs: 'normal', sm: 'center' }}
                  >
                    <Typography variant='body1' fontSize={{ xs: 12, sm: 16 }}>
                      {item.product.category}
                    </Typography>
                    <Typography variant='body1' fontSize={{ xs: 12, sm: 16 }}>
                      {item.product.subcategory}
                    </Typography>
                  </Stack>

                  <FormControl sx={{ width: { xs: '70%', md: '40%' } }}>
                    <InputLabel id='quantity-label'>Quantity</InputLabel>
                    <Select
                      labelId='quantity-label'
                      id='qty-id'
                      label='Quantity'
                      margin='dense'
                      value={quantities[index]}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value, item)
                      }
                      sx={{ height: { xs: 35, sm: 45 }, pl: 0 }}
                    >
                      {Array.from(
                        Array(item.product.quantityInStock).keys()
                      ).map((index) => (
                        <MenuItem key={index} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      height: '100%',
                    }}
                  >
                    <Button
                      color='error'
                      variant='outlined'
                      size='small'
                      endIcon={<Delete />}
                      sx={{ mb: 2 }}
                      onClick={() => handleDelete(item)}
                    >
                      {language === 'en' ? 'Delete' : '削除'}
                    </Button>
                  </Box>
                </Stack>
                <Typography
                  variant='body1'
                  fontSize={{ xs: 14, sm: 16 }}
                  sx={{ pr: { xs: 1, md: 0 } }}
                >
                  {item.product.language === 'en'
                    ? `$${(item.product.price * item.quantity).toFixed(2)}`
                    : `¥${item.product.price}`}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ))}
    </>
  )
}

export default CartItems
