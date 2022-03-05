import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import ReactHookFormTextField from '../CustomInputs/ReactHookFormTextField'
import ReactHookFormSelect from '../CustomInputs/ReactHookFormSelect'
import { stateList, prefectureList } from '../../assets/data/data'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../redux/services/userAPI'
import CustomAlert from '../CustomMUI/CustomAlert'
import { setUser } from '../../redux/states/user'

const ShippingAddress = ({ userQueryData, headers }) => {
  const methods = useForm()

  const countries = ['USA', 'Japan']
  const user = useSelector((state) => state.user.user)
  const [updateUser, { isSuccess }] = useUpdateUserMutation()

  const dispatch = useDispatch()

  let country = methods.watch(
    'country',
    userQueryData.result.defaultAddress === null
      ? 'USA'
      : userQueryData.result.defaultAddress.country
  )

  const onSubmit = (data) => {
    if (
      userQueryData.result.defaultAddress &&
      data.street === userQueryData.result.defaultAddress.street &&
      data.city === userQueryData.result.defaultAddress.city &&
      data.state === userQueryData.result.defaultAddress.state &&
      data.postalCode === userQueryData.result.defaultAddress.postalCode &&
      data.country === userQueryData.result.defaultAddress.country
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
      userID: userQueryData.result.userId,
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
                <ReactHookFormTextField
                  defaultValue={
                    userQueryData.result.defaultAddress
                      ? userQueryData.result.defaultAddress.streetAddress
                      : ''
                  }
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
                <ReactHookFormTextField
                  defaultValue={
                    userQueryData.result.defaultAddress
                      ? userQueryData.result.defaultAddress.city
                      : ''
                  }
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
                <ReactHookFormTextField
                  defaultValue={
                    userQueryData.result.defaultAddress
                      ? userQueryData.result.defaultAddress.postalCode
                      : ''
                  }
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
                <ReactHookFormSelect
                  defaultValue={
                    userQueryData.result.defaultAddress
                      ? userQueryData.result.defaultAddress.statePrefecture
                      : ''
                  }
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
                  defaultValue={
                    userQueryData.result.defaultAddress
                      ? userQueryData.result.defaultAddress.country
                      : ''
                  }
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
