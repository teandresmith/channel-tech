import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { MHFTextField, MHFSelect } from 'mui-hook-form-mhf'
import { stateList, prefectureList } from '../../assets/data/data'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { useUpdateUserMutation } from '../../redux/services/userAPI'
import CustomAlert from '../CustomMUI/CustomAlert'
import { setUser } from '../../redux/states/user'
import { User } from '../../redux/types/Types'

type FormData = {
  defaultAddress: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

type ShippingAddressProps = {
  userQueryData: User['user']
  headers: { token?: string; refreshToken?: string }
}

const ShippingAddress = ({ userQueryData, headers }: ShippingAddressProps) => {
  const methods = useForm<FormData>()

  const countries = ['USA', 'Japan']
  const user = useAppSelector((state) => state.user.user)
  const [updateUser, { isSuccess }] = useUpdateUserMutation()

  const dispatch = useAppDispatch()

  let country = methods.watch(
    'country',
    userQueryData?.defaultAddress === null
      ? 'USA'
      : userQueryData?.defaultAddress?.country
  )

  const onSubmit = (data: FormData) => {
    if (
      userQueryData?.defaultAddress &&
      data.street === userQueryData?.defaultAddress?.streetAddress &&
      data.city === userQueryData?.defaultAddress?.city &&
      data.state === userQueryData?.defaultAddress.statePrefecture &&
      data.postalCode === userQueryData?.defaultAddress?.postalCode &&
      data.country === userQueryData?.defaultAddress?.country
    ) {
      return
    }

    const changeData = {
      defaultAddress: {
        streetAddress: data.street,
        city: data.city,
        statePrefecture: data.state,
        country: data.country,
        postalCode: data.postalCode,
      },
    }

    updateUser({
      user: changeData,
      userID: userQueryData?.userId,
      headers: headers,
    })

    dispatch(
      setUser({
        user: {
          ...user,
          defaultAddress: {
            streetAddress: data.street,
            city: data.city,
            statePrefecture: data.state,
            country: data.country,
            postalCode: data.postalCode,
          },
        },
      })
    )
  }

  return (
    <>
      <Box
        component='div'
        sx={{ pt: 1, pl: { xs: 1, sm: 5 }, pr: { xs: 1, sm: 5 } }}
      >
        {isSuccess && (
          <CustomAlert
            severity={'success'}
            message={'Info Successfully Changed!'}
            sx={{ width: { xs: '100%', md: '70%', mb: 2 } }}
          />
        )}
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{ width: { xs: '100%', md: '70%' } }}
        >
          <FormProvider {...methods}>
            <Grid container columnSpacing={2} rowSpacing={{ xs: 2, md: 1 }}>
              <Grid item xs={12}>
                <MHFTextField
                  defaultValue={userQueryData?.defaultAddress?.streetAddress}
                  name='street'
                  control={methods.control}
                  margin='dense'
                  label='Street Address'
                  id='street'
                  fullWidth
                  color='secondary'
                  helperText={
                    'US ex. 11111 Example Ave. | JP ex. パックマンション４０１室'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MHFTextField
                  defaultValue={userQueryData?.defaultAddress?.city}
                  name='city'
                  control={methods.control}
                  margin='dense'
                  label='City'
                  id='city'
                  fullWidth
                  color='secondary'
                  helperText={'US ex. Boston | JP ex. 南青山１－１－１'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MHFTextField
                  defaultValue={userQueryData?.defaultAddress?.postalCode}
                  name='postalCode'
                  control={methods.control}
                  margin='dense'
                  label='Postal Code'
                  id='postalCode'
                  fullWidth
                  color='secondary'
                  helperText={''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MHFSelect
                  defaultValue={userQueryData?.defaultAddress?.statePrefecture}
                  name='state'
                  control={methods.control}
                  fullWidth
                  required
                  label={country === 'USA' ? 'State' : 'Prefecture'}
                  labelId='state-selector'
                  selectItemList={
                    country === 'USA' ? stateList : prefectureList
                  }
                  color='secondary'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MHFSelect
                  defaultValue={userQueryData?.defaultAddress?.country}
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

            <Box component='div' sx={{ pt: 1 }}>
              <Button color='secondary' variant='contained' type='submit'>
                Save
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </>
  )
}

export default ShippingAddress
