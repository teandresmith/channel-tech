import React from 'react'
import { Box, Stack, Button, Typography, Alert } from '@mui/material'

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { setPaymentInfo, setShippingInfo } from '../../redux/states/checkout'
import { clearCart } from '../../redux/states/cart'
import { useUpdateUserMutation } from '../../redux/services/userAPI'
import { useMakeNewOrderMutation } from '../../redux/services/orderAPI'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PaymentInfo = ({
  decrementActiveStep,
  incrementActiveStep,
  userQueryData,
  headers,
}) => {
  const cart = useSelector((state) => state.cart.value)
  const shippingInfo = useSelector((state) => state.checkout.shippingInfo)
  const dispatch = useDispatch()

  const [updateUser] = useUpdateUserMutation()

  const [makeNewOrder] = useMakeNewOrderMutation()

  const calculateCartTotal = () => {
    if (cart.length === 0) {
      return 0
    }
    let total = cart.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.product.price * currentValue.quantity,
      0
    )
    if (total < 100) {
      total = total + 5
    }
    return total
  }

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log(error)
    } else {
      let orderItems = []
      for (var i = 0; i < cart.length; i++) {
        let orderItem = {
          product: cart[i].product,
          quantity: cart[i].quantity,
        }
        orderItems.push(orderItem)
      }

      const newOrder = {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        paymentMethod: 'Card',
        shippingAddress: {
          streetAddress: shippingInfo.street,
          city: shippingInfo.city,
          statePrefecture: shippingInfo.state,
          country: shippingInfo.country,
          postalCode: shippingInfo.postalCode,
        },
        orderItems: orderItems,
        totalPrice: calculateCartTotal(),
        isPaid: 'PAID',
      }

      // Set up Create Order API
      let { data } = await makeNewOrder(newOrder)

      if (Object.keys(userQueryData).length !== 0 && userQueryData.result) {
        let orders = []
        if (userQueryData.result.orders) {
          orders = [...userQueryData.result.orders]
        }
        orders.push(data.result)
        updateUser({
          user: {
            orders: orders,
          },
          userID: userQueryData.result.userId,
          headers: headers,
        })
      }

      dispatch(
        setPaymentInfo({
          paymentInfo: {
            paymentId: paymentMethod.id,
            orderId: data.result.orderId,
          },
        })
      )
      dispatch(clearCart())
      dispatch(
        setShippingInfo({
          shippingInfo: {},
        })
      )
      incrementActiveStep()
    }
  }

  return (
    <>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <Box component='div'>
                <Typography variant='h6' sx={{ pb: 2 }}>
                  Cart Items
                </Typography>
                {cart.map((item, index) => (
                  <Stack
                    key={index}
                    direction='row'
                    justifyContent={'space-between'}
                  >
                    <Typography
                      variant='body1'
                      sx={{ fontSize: { xs: 14, sm: 16 } }}
                    >
                      {item.product.name}
                    </Typography>
                    <Box component='div' sx={{ pb: 4 }}>
                      <Typography
                        variant='body1'
                        sx={{ fontSize: { xs: 12, sm: 16 } }}
                      >
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{ fontSize: { xs: 12, sm: 16 } }}
                      >
                        Total: $
                        {(item.quantity * item.product.price).toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
                <Stack
                  direction='row'
                  justifyContent={'space-between'}
                  sx={{ pb: 2 }}
                >
                  <Typography
                    variant='body1'
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                  >
                    Shipping Fee
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                  >
                    $
                    {calculateCartTotal() > 100
                      ? (0).toFixed(2)
                      : (5).toFixed(2)}
                  </Typography>
                </Stack>
              </Box>

              <Alert severity={'warning'} sx={{ mb: 4 }}>
                Please use 4242424242424242 as the card number and 4242424 as
                the MM/YY CVC because the API is only a test endpoint for Stripe
                API
              </Alert>
              <CardElement />
              <Stack direction='row' spacing={1} sx={{ pt: 3, width: '100%' }}>
                <Button
                  variant='contained'
                  color='info'
                  sx={{ color: 'white', backgroundColor: 'black' }}
                  onClick={() => decrementActiveStep()}
                >
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  sx={{ mt: 2 }}
                  disabled={!stripe}
                >
                  Pay $
                  {calculateCartTotal() > 100
                    ? calculateCartTotal().toFixed(2)
                    : (calculateCartTotal() + 5).toFixed(2)}
                </Button>
              </Stack>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentInfo
