import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { Alert, Box, Button } from '@mui/material'
import { MHFTextField } from 'mui-hook-form-mhf'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { useUpdateUserMutation } from '../../redux/services/userAPI'
import { setUser } from '../../redux/states/user'
import CustomAlert from '../CustomMUI/CustomAlert'
import { User } from '../../redux/types/Types'

type FormData = {
  firstName: string
  lastName: string
  email: string
  Password: string
  confirmPassword: string
}

type PersonalInfoProps = {
  userQueryData: User['user']
  headers: { token?: string; refreshToken?: string }
}

const PersonalInfo = ({ userQueryData, headers }: PersonalInfoProps) => {
  const methods = useForm<FormData>()
  const [message, setMessage] = React.useState('')

  const user = useAppSelector((state) => state.user.user)
  const [updateUser, { isSuccess }] = useUpdateUserMutation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = (data: FormData) => {
    if (!confirmPassword(data?.Password, data?.confirmPassword)) {
      return
    }

    if (
      data.firstName === userQueryData?.firstName &&
      data.lastName === userQueryData?.lastName &&
      data.email === userQueryData?.email &&
      data.Password === userQueryData?.Password
    ) {
      return
    }

    interface Data {
      firstName: string
      lastName: string
      email: string
      Password?: string
    }

    let changeData: Data = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      Password: data.Password,
    }

    // if data.password === '' -> do not dispatch the password
    if (data.Password === '') {
      delete changeData?.Password
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
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          Password: data?.Password,
        },
      })
    )
  }

  const confirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setMessage('Password and Confirm Password fields do not match.')
      return false
    }

    setMessage('')
    return true
  }

  React.useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user, navigate])

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
        {message !== '' && (
          <Alert
            severity='error'
            sx={{ width: { xs: '100%', md: '70%', mb: 2 } }}
          >
            {message}
          </Alert>
        )}
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{ width: { xs: '100%', md: '70%' } }}
        >
          <FormProvider {...methods}>
            <MHFTextField
              defaultValue={userQueryData?.firstName}
              name='firstName'
              control={methods.control}
              margin='dense'
              label='First Name'
              id='firstName'
              fullWidth
              color='secondary'
              required
            />
            <MHFTextField
              defaultValue={userQueryData?.lastName}
              name='lastName'
              control={methods.control}
              margin='dense'
              label='Last Name'
              id='lastName'
              fullWidth
              color='secondary'
            />
            <MHFTextField
              defaultValue={userQueryData?.email}
              name='email'
              control={methods.control}
              margin='dense'
              label='Email'
              id='email'
              fullWidth
              color='secondary'
              type='email'
              required
            />
            <MHFTextField
              defaultValue={''}
              name='password'
              control={methods.control}
              margin='dense'
              label='Password'
              id='password'
              fullWidth
              type='password'
              color='secondary'
            />
            <MHFTextField
              defaultValue={''}
              name='confirmPassword'
              control={methods.control}
              margin='dense'
              label='Confirm Password'
              id='confirmPassword'
              fullWidth
              type='password'
              color='secondary'
            />

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

export default PersonalInfo
