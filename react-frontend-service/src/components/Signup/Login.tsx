import React from 'react'
import {
  Box,
  Button,
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
import { useLoginMutation } from '../../redux/services/loginAPI'
import { setUser } from '../../redux/states/user'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

type FormData = {
  email: string
  Password: string
}

const Login = () => {
  const methods = useForm<FormData>()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, { isLoading, data }] = useLoginMutation()

  const language = useAppSelector((state) => state.language.language)

  const onSubmit = (data: FormData) => {
    login(data)
    methods.setValue('email', '')
    methods.setValue('Password', '')
  }

  React.useEffect(() => {
    if (data && data.message === 'Login Successful') {
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
  }, [data])

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
                style={{ padding: '15px' }}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Stack direction='column' spacing={2}>
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
                    id={'password'}
                    variant='outlined'
                    color='secondary'
                    type='password'
                    required
                  />
                  <Stack direction='row' spacing={1}>
                    <Button
                      variant='contained'
                      component='button'
                      size={matches ? 'small' : 'medium'}
                      color='secondary'
                      type='submit'
                      sx={{ backgroundColor: 'black', color: 'white' }}
                    >
                      {language === 'jp' ? '????????????' : 'Login'}
                    </Button>
                    <Button
                      variant='text'
                      color='secondary'
                      size={matches ? 'small' : 'medium'}
                      component={Link}
                      sx={{ color: 'black', fontSize: { xs: 12, sm: 14 } }}
                      to='/register'
                    >
                      Not Registered? Sign up here
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

export default Login
