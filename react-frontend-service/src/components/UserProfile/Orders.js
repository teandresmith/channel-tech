import React from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Orders = ({ userQueryData }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const language = useSelector((state) => state.language.language)

  return (
    <>
      <Box
        component='div'
        sx={{ pt: 1, pl: { xs: 1, sm: 5 }, pr: { xs: 1, sm: 5 } }}
      >
        {userQueryData.result.orders === null ||
        userQueryData.result.orders.length === 0 ? (
          <>
            <Typography variant='h5'>
              {language === 'en'
                ? 'You have not ordered anything yet...'
                : 'すみません、注文歴史はありません'}
            </Typography>
            <Button
              component={Link}
              to='/shop'
              variant='contained'
              color='secondary'
            >
              View Shop
            </Button>
          </>
        ) : matches ? (
          <MobileOrderView userQueryData={userQueryData} />
        ) : (
          <>
            {userQueryData.result.orders.map((order) => (
              <Box
                key={order.orderId}
                component='div'
                sx={{ width: '100%', pt: 2, pb: 2 }}
              >
                <Stack
                  direction='row'
                  justifyContent={'space-between'}
                  sx={{
                    border: '1px solid lavender',
                    borderRadius: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    p: 1,
                    backgroundColor: 'lavender',
                  }}
                >
                  <Box component='div'>
                    <Typography variant='body1'>
                      {language === 'en' ? 'Order ID' : '注文番号'}
                    </Typography>
                    <Typography variant='body1'>{order.orderId}</Typography>
                  </Box>

                  <Box component='div'>
                    <Typography variant='body1'>
                      {language === 'en' ? 'Total Price' : '合計金額'}
                    </Typography>
                    <Typography variant='body1'>
                      ${order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box component='div'>
                    <Typography variant='body1'>
                      {language === 'en' ? 'Date Ordered' : '注文した日付'}
                    </Typography>
                    <Typography variant='body1'>
                      {order.createdAt.split('T')[0]}
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  component='div'
                  sx={{
                    border: '1px solid lavender',
                    p: 1,
                    borderBottomLeftRadius: 1,
                    borderBottomRightRadius: 1,
                  }}
                >
                  {order.orderItems.map((item, index) => (
                    <Stack
                      direction='row'
                      justifyContent={'space-between'}
                      key={index}
                      sx={{ pt: 1, pb: 1 }}
                    >
                      <Box component='div' sx={{ height: '100%' }}>
                        <Typography variant='body1'>
                          {item.product.name}
                        </Typography>
                        <Box
                          component='img'
                          src={item.product.image}
                          sx={{ width: 100, height: 75, objectFit: 'contain' }}
                        />
                      </Box>

                      <Box component='div' sx={{ height: '100%' }}>
                        <Typography variant='caption'>
                          {language === 'en' ? 'Quantity: ' : '量: '}{' '}
                          {item.quantity}
                        </Typography>
                        <Typography variant='body1'>
                          {language === 'en' ? 'Price: ' : '価格: '}{' '}
                          {item.product.language === 'en' ? '$' : '¥'}
                          {item.product.price}
                        </Typography>
                        <Box
                          component='div'
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            height: '100%',
                          }}
                        >
                          <Button
                            component={Link}
                            to={`/products/${item.product.productId}`}
                            variant='contained'
                            color='secondary'
                            size='small'
                            sx={{
                              backgroundColor: 'black',
                              color: 'white',
                              height: '100%',
                            }}
                          >
                            View Product
                          </Button>
                        </Box>
                      </Box>
                    </Stack>
                  ))}
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default Orders

const MobileOrderView = ({ userQueryData }) => {
  const language = useSelector((state) => state.language.language)

  return userQueryData.result.orders.map((order) => (
    <Box
      key={order.orderId}
      component='div'
      sx={{ width: '100%', pt: 1, pb: 2 }}
    >
      <Stack
        direction='column'
        sx={{
          border: '1px solid lavender',
          borderRadius: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          p: 1,
          backgroundColor: 'lavender',
        }}
      >
        <Box component='div'>
          <Typography variant='body1'>
            {language === 'en' ? 'Order ID: ' : '注文番号: '} {order.orderId}
          </Typography>
        </Box>

        <Box component='div'>
          <Typography variant='body1'>
            {language === 'en' ? 'Total Price: ' : '合計金額: '} $
            {order.totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box component='div'>
          <Typography variant='body1'>
            {language === 'en' ? 'Date Ordered: ' : '注文した日付: '}{' '}
            {order.createdAt.split('T')[0]}
          </Typography>
        </Box>
      </Stack>

      <Box
        component='div'
        sx={{
          border: '1px solid lavender',
          p: 1,
          borderBottomLeftRadius: 1,
          borderBottomRightRadius: 1,
        }}
      >
        {order.orderItems.map((item, index) => (
          <Stack
            direction='column'
            justifyContent={'center'}
            key={index}
            sx={{ pt: 2, pb: 2, width: '100%' }}
          >
            <Box component='div'>
              <Typography variant='body1'>{item.product.name}</Typography>
              <Box
                component='img'
                src={item.product.image}
                sx={{ width: '100%', maxHeight: 175, objectFit: 'contain' }}
              />
            </Box>

            <Box component='div'>
              <Typography variant='caption'>
                {language === 'en' ? 'Quantity: ' : '量: '} {item.quantity}
              </Typography>
              <Typography variant='body1'>
                {language === 'en' ? 'Price: ' : '価格: '}{' '}
                {item.product.language === 'en' ? '$' : '¥'}
                {item.product.price}
              </Typography>
              <Box component='div'>
                <Button
                  component={Link}
                  to={`/products/${item.product.productId}`}
                  variant='contained'
                  color='secondary'
                  size='small'
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    height: '100%',
                  }}
                >
                  View Product
                </Button>
              </Box>
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  ))
}
