import React from 'react'
import { Grid, Stack, Button, Box } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { MHFTextField, MHFSelect } from 'mui-hook-form-mhf'

import { prefectureList, stateList } from '../../assets/data/data'
import { setShippingInfo } from '../../redux/states/checkout'

type FormData = {
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

type ShippingInfoProps = {
  incrementActiveStep: () => void
  userQueryData: {
    _id: string
    firstName: string
    lastName: string
    email: string
    Password: string
    orders: Array<any>
    defaultAddress: {
      streetAddress: string
      city: string
      statePrefecture: string
      country: string
      postalCode: string
    }
    userType: string
    userId: string
    token: string
    refreshToken: string
    createdAt: string
    updatedAt: string
  }
}

const ShippingInfo = ({
  incrementActiveStep,
  userQueryData,
}: ShippingInfoProps) => {
  const methods = useForm<FormData>()
  const countries = ['USA', 'Japan']

  const dispatch = useAppDispatch()
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo)

  let country = methods.watch(
    'country',
    Object.keys(userQueryData).length === 0
      ? 'USA'
      : userQueryData?.defaultAddress?.country
  )

  const onSubmit = (data: FormData) => {
    dispatch(
      setShippingInfo({
        shippingInfo: data,
      })
    )
    incrementActiveStep()
  }

  const setUserInfo = () => {
    methods.setValue('firstName', userQueryData?.firstName)
    methods.setValue('lastName', userQueryData?.lastName)
    methods.setValue('email', userQueryData?.email)
    if (userQueryData?.defaultAddress) {
      methods.setValue('street', userQueryData?.defaultAddress?.streetAddress)
      methods.setValue('city', userQueryData?.defaultAddress?.city)
      methods.setValue('postalCode', userQueryData?.defaultAddress?.postalCode)
      methods.setValue('state', userQueryData?.defaultAddress?.statePrefecture)
      methods.setValue('country', userQueryData?.defaultAddress?.country)
    }
  }

  React.useEffect(() => {
    if (shippingInfo && shippingInfo?.firstName) {
      methods.setValue('firstName', shippingInfo?.firstName)
      methods.setValue('lastName', shippingInfo?.lastName)
      methods.setValue('email', shippingInfo?.email)
      methods.setValue('street', shippingInfo?.street)
      methods.setValue('city', shippingInfo?.city)
      methods.setValue('postalCode', shippingInfo?.postalCode)
      methods.setValue('state', shippingInfo?.state)
      methods.setValue('country', shippingInfo?.country)
    }
  }, [])

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box component='div'>
            {userQueryData && (
              <Button color='secondary' onClick={() => setUserInfo()}>
                Use Default Shipping Address
              </Button>
            )}
          </Box>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} sm={4}>
              <MHFTextField
                defaultValue=''
                name='firstName'
                control={methods.control}
                autoFocus
                margin='dense'
                label='First Name'
                id='firstName'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MHFTextField
                defaultValue=''
                name='lastName'
                control={methods.control}
                margin='dense'
                label='Last Name'
                id='lastName'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MHFTextField
                defaultValue=''
                name='email'
                control={methods.control}
                margin='dense'
                label='Email'
                id='email'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12}>
              <MHFTextField
                defaultValue=''
                name={'street'}
                control={methods.control}
                margin='dense'
                label='Street Address'
                helperText={
                  'US ex. 11111 Example Ave. | JP ex. パックマンション４０１室'
                }
                id='street'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MHFTextField
                defaultValue=''
                name='city'
                control={methods.control}
                margin='dense'
                label='City'
                helperText={'US ex. Boston | JP ex. 南青山１－１－１'}
                id='city'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MHFTextField
                defaultValue=''
                name='postalCode'
                control={methods.control}
                margin='dense'
                label='Postal Code'
                id='postalCode'
                fullWidth
                variant='outlined'
                required
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MHFSelect
                defaultValue={''}
                name='state'
                control={methods.control}
                fullWidth
                required
                label={country === 'USA' ? 'State' : 'Prefecture'}
                labelId='state-selector'
                selectItemList={country === 'USA' ? stateList : prefectureList}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MHFSelect
                defaultValue={countries[0]}
                name='country'
                control={methods.control}
                fullWidth
                label={'Country'}
                labelId='country-selector'
                selectItemList={countries}
                color='secondary'
              />
            </Grid>
          </Grid>
          <Stack direction='row' spacing={1} sx={{ pt: 1, width: '100%' }}>
            <Button
              disabled={true}
              variant='contained'
              color='info'
              sx={{ color: 'white', backgroundColor: 'black' }}
            >
              Back
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              sx={{ mt: 2 }}
            >
              Next
            </Button>
          </Stack>
        </FormProvider>
      </form>
    </>
  )
}

export default ShippingInfo
