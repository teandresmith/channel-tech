import React from 'react'
import { Grid, Stack, Button, Box } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ReactHookFormTextField from '../CustomInputs/ReactHookFormTextField'
import ReactHookFormSelect from '../CustomInputs/ReactHookFormSelect'
import { prefectureList, stateList } from '../../assets/data/data'
import { useEffect } from 'react'
import { setShippingInfo } from '../../redux/states/checkout'

const ShippingInfo = ({ incrementActiveStep, userQueryData }) => {
  const methods = useForm()
  const countries = ['USA', 'Japan']

  const dispatch = useDispatch()
  const shippingInfo = useSelector((state) => state.checkout.shippingInfo)

  let country = methods.watch(
    'country',
    Object.keys(userQueryData).length === 0
      ? 'USA'
      : userQueryData.result &&
          userQueryData.defaultAddress &&
          userQueryData.result.defaultAddress.country
  )

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      setShippingInfo({
        shippingInfo: data,
      })
    )
    incrementActiveStep()
  }

  const setUserInfo = () => {
    methods.setValue('firstName', userQueryData.result.firstName)
    methods.setValue('lastName', userQueryData.result.lastName)
    methods.setValue('email', userQueryData.result.email)
    if (userQueryData.result.defaultAddress) {
      methods.setValue(
        'street',
        userQueryData.result.defaultAddress.streetAddress
      )
      methods.setValue('city', userQueryData.result.defaultAddress.city)
      methods.setValue(
        'postalCode',
        userQueryData.result.defaultAddress.postalCode
      )
      methods.setValue(
        'state',
        userQueryData.result.defaultAddress.statePrefecture
      )
      methods.setValue('country', userQueryData.result.defaultAddress.country)
    }
  }

  useEffect(() => {
    if (shippingInfo && shippingInfo.firstName) {
      methods.setValue('firstName', shippingInfo.firstName)
      methods.setValue('lastName', shippingInfo.lastName)
      methods.setValue('email', shippingInfo.email)
      methods.setValue('street', shippingInfo.street)
      methods.setValue('city', shippingInfo.city)
      methods.setValue('postalCode', shippingInfo.postalCode)
      methods.setValue('state', shippingInfo.state)
      methods.setValue('country', shippingInfo.country)
    }
  }, [])

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box componet='div'>
            {userQueryData && userQueryData.result && (
              <Button color='secondary' onClick={() => setUserInfo()}>
                Use Default Shipping Address
              </Button>
            )}
          </Box>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} sm={4}>
              <ReactHookFormTextField
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
              <ReactHookFormTextField
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
              <ReactHookFormTextField
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
              <ReactHookFormTextField
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
              <ReactHookFormTextField
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
              <ReactHookFormTextField
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
              <ReactHookFormSelect
                defaultValue={''}
                name='state'
                control={methods.control}
                fullWidth
                required
                label={country === 'USA' ? 'State' : 'Prefecture'}
                labelId='state-selector'
                selectId={'state'}
                selectData={country === 'USA' ? stateList : prefectureList}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReactHookFormSelect
                defaultValue={countries[0]}
                name='country'
                control={methods.control}
                fullWidth
                label={'Country'}
                labelId='country-selector'
                selectId={'country'}
                selectData={countries}
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
