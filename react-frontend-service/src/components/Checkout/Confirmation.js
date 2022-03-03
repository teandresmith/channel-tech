import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Confirmation = () => {
  const paymentInfo = useSelector((state) => state.checkout.paymentInfo)

  return (
    <>
      <Box component='div'>
        <Typography variant='h6'>Thank you for shopping with us!</Typography>
        <Typography variant='body1' sx={{ pb: 3 }}>
          If you have any questions or concerns regarding your order, please
          contact us!
        </Typography>
        <Typography variant='body1' sx={{ pb: 5 }}>
          Your order confirmation id is: #{paymentInfo.orderId}
        </Typography>
        <Box
          component='div'
          sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <Button
            component={Link}
            to='/'
            variant='outlined'
            color='secondary'
            sx={{ width: '60%' }}
          >
            Return to Home
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Confirmation
