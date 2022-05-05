import React, { useState } from 'react'
import { Stepper, Container, Box, Step, StepLabel, Alert } from '@mui/material'
import ShippingInfo from '../Checkout/ShippingInfo'
import PaymentInfo from '../Checkout/PaymentInfo'
import Confirmation from '../Checkout/Confirmation'
import Loading from '../Loading'

import { useGetUserByIDQuery } from '../../redux/services/userAPI'
import { useAppSelector } from '../../hooks/reduxHooks'
import Cookies from 'js-cookie'

const Checkout = () => {
  const steps = ['Shipping Info', 'Payment Info', 'Confirmation']
  const [activeStep, setActiveStep] = useState(0)

  const incrementActiveStep = () => {
    setActiveStep((prevValue) => prevValue + 1)
  }

  const decrementActiveStep = () => {
    setActiveStep((prevValue) => prevValue - 1)
  }

  const user = useAppSelector((state) => state.user.user)

  const headers = {
    token: Cookies.get('Token'),
    refreshToken: Cookies.get('RefreshToken'),
  }

  const { data, isLoading, error } = useGetUserByIDQuery({
    userID: user.userId,
    headers: headers,
  })

  const setActivePage = () => {
    switch (activeStep) {
      case 0:
        return (
          <ShippingInfo
            incrementActiveStep={incrementActiveStep}
            userQueryData={error ? {} : data.result}
          />
        )
      case 1:
        return (
          <PaymentInfo
            incrementActiveStep={incrementActiveStep}
            decrementActiveStep={decrementActiveStep}
            userQueryData={error ? {} : data}
            headers={headers}
          />
        )
      case 2:
        return <Confirmation />
      default:
        break
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container maxWidth='md'>
          <Alert severity={'warning'} sx={{ mb: 2 }}>
            We recommend to not reload the page while checking out as it may
            cause issues throughout the checkout process
          </Alert>
          <Box component='div'>
            <Stepper
              activeStep={activeStep}
              sx={{
                '& .MuiSvgIcon-root.Mui-active': { color: 'purple' },
                '& .MuiSvgIcon-root.Mui-completed': { color: 'purple' },
              }}
              alternativeLabel
            >
              {steps.map((item) => (
                <Step key={item}>
                  <StepLabel sx={{}}>{item}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box
            component='div'
            sx={{
              mt: 4,
              backgroundColor: 'lavender',
              borderRadius: 2,
              p: 3,
              mb: { xs: 4, md: 0 },
            }}
          >
            {setActivePage()}
          </Box>
        </Container>
      )}
    </>
  )
}

export default Checkout
