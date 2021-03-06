import React from 'react'
import {
  Button,
  Box,
  Stack,
  Paper,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/system'
import { MHFTextField } from 'mui-hook-form-mhf'
import { useRegisterMutation } from '../../redux/services/loginAPI'
import { setUser } from '../../redux/states/user'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

type FormData = {
  firstName: string
  lastName: string
  email: string
  Password: string
}

const Register = () => {
  const methods = useForm<FormData>()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [register, { isLoading, data }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const language = useAppSelector((state) => state.language.language)

  const onSubmit = (data: FormData) => {
    register(data)
    methods.setValue('firstName', '')
    methods.setValue('lastName', '')
    methods.setValue('email', '')
    methods.setValue('Password', '')
  }

  React.useEffect(() => {
    if (data && data.message === 'Registration Successful') {
      navigate('/')
      dispatch(
        setUser({
          user: data.result,
        })
      )

      const thirtyMinutes = new Date(new Date().getTime() + 15 * 60 * 1000)
      const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000)
      Cookies.set('Token', data.result.token, { expires: thirtyMinutes })
      Cookies.set('RefreshToken', data.result.refreshToken, {
        expires: oneHour,
      })

      const dataCopy = {
        firstName: data.result.firstName,
        lastName: data.result.lastName,
        userId: data.result.userId,
      }

      localStorage.setItem('user', JSON.stringify(dataCopy))
    }
  }, [data, dispatch, navigate])
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='secondary' />
      </Backdrop>
      <Box component='div' sx={{ height: '80vh' }}>
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: 5,
            height: { xs: '85%', sm: '85%', lg: '90%' },
          }}
        >
          <Box component='div'>
            <Paper elevation={5} sx={{ backgroundColor: 'lavender' }}>
              <form
                style={{ padding: 15 }}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Stack direction='column' spacing={2}>
                  <MHFTextField
                    defaultValue=''
                    name='firstName'
                    control={methods.control}
                    autoFocus
                    margin='dense'
                    label={language === 'en' ? 'First Name' : '??????'}
                    id={'firstName'}
                    variant='outlined'
                    color='secondary'
                    required
                  />
                  <MHFTextField
                    defaultValue=''
                    name='lastName'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Last Name' : '??????'}
                    id={'lastName'}
                    variant='outlined'
                    color='secondary'
                    required
                  />
                  <MHFTextField
                    defaultValue=''
                    name='email'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Email' : '?????????????????????'}
                    id={'email'}
                    variant='outlined'
                    color='secondary'
                    type='email'
                    required
                  />
                  <MHFTextField
                    defaultValue=''
                    name='Password'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Password' : '???????????????'}
                    id={'Password'}
                    variant='outlined'
                    color='secondary'
                    type='password'
                    required
                  />

                  <Stack direction='row' spacing={1}>
                    <Button
                      variant='contained'
                      color='secondary'
                      component='button'
                      size={matches ? 'small' : 'medium'}
                      type='submit'
                      sx={{ backgroundColor: 'black', color: 'white' }}
                    >
                      {language === 'jp' ? '????????????' : 'Register'}
                    </Button>
                    <Button
                      color='secondary'
                      variant='text'
                      component={Link}
                      size={matches ? 'small' : 'medium'}
                      to='/login'
                      sx={{ color: 'black', fontSize: { xs: 10, sm: 14 } }}
                    >
                      Already Registered? Login Here
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Register
