import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { Alert, Box, Button } from '@mui/material'
import ReactHookFormTextField from '../CustomInputs/ReactHookFormTextField'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../redux/services/userAPI'
import { setUser } from '../../redux/states/user'
import CustomAlert from '../CustomMUI/CustomAlert'

const PersonalInfo = ({ userQueryData, headers }) => {
  const methods = useForm()
  const [message, setMessage] = useState('')

  const user = useSelector((state) => state.user.user)
  const [updateUser, { isSuccess }] = useUpdateUserMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (!confirmPassword(data.password, data.confirmPassword)) {
      return
    }

    if (
      data.firstName === userQueryData.result.firstName &&
      data.lastName === userQueryData.result.lastName &&
      data.email === userQueryData.result.email &&
      data.Password === userQueryData.result.Password
    ) {
      return
    }

    let changeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      Password: data.password,
    }

    // if data.password === '' -> do not dispatch the password
    if (data.password === '') {
      delete changeData.Password
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
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          Password: data.password,
        },
      })
    )
  }

  const confirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setMessage('Password and Confirm Password fields do not match.')
      return false
    }

    setMessage('')
    return true
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
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
            <ReactHookFormTextField
              defaultValue={userQueryData.result.firstName}
              name='firstName'
              control={methods.control}
              margin='dense'
              label='First Name'
              id='firstName'
              fullWidth
              color='secondary'
              required
            />
            <ReactHookFormTextField
              defaultValue={userQueryData.result.lastName}
              name='lastName'
              control={methods.control}
              margin='dense'
              label='Last Name'
              id='lastName'
              fullWidth
              color='secondary'
            />
            <ReactHookFormTextField
              defaultValue={userQueryData.result.email}
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
            <ReactHookFormTextField
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
            <ReactHookFormTextField
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
