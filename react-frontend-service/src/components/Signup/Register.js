import React, { useEffect } from 'react'
import { Button, Box, Stack, Paper, useMediaQuery } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import ReactHookFormTextField from '../CustomInputs/ReactHookFormTextField'
import Loading from '../Loading'
import { useRegisterMutation } from '../../redux/services/loginAPI'
import { setUser } from '../../redux/states/user'
import Cookies from 'js-cookie'

const Register = () => {
  const methods = useForm()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [register, { isLoading, data }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const language = useSelector((state) => state.language.language)

  const onSubmit = (data) => {
    register(data)
    methods.setValue('firstName', '')
    methods.setValue('lastName', '')
    methods.setValue('email', '')
    methods.setValue('Password', '')
  }

  useEffect(() => {
    if (data && data.message === 'Registration Successful') {
      navigate('/')
      dispatch(
        setUser({
          user: data.result,
        })
      )

      const thirtyMinutes = 1 / 48
      const threeHours = 1 / 20
      Cookies.set('Token', data.result.token, { expires: thirtyMinutes })
      Cookies.set('RefreshToken', data.result.refreshToken, {
        expires: threeHours,
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
      <Loading open={isLoading} />
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
                  <ReactHookFormTextField
                    defaultValue=''
                    name='firstName'
                    control={methods.control}
                    autoFocus
                    margin='dense'
                    label={language === 'en' ? 'First Name' : '名前'}
                    id={'firstName'}
                    variant='outlined'
                    color='secondary'
                    required
                  />
                  <ReactHookFormTextField
                    defaultValue=''
                    name='lastName'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Last Name' : '名字'}
                    id={'lastName'}
                    variant='outlined'
                    color='secondary'
                    required
                  />
                  <ReactHookFormTextField
                    defaultValue=''
                    name='email'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Email' : 'メールアドレス'}
                    id={'email'}
                    variant='outlined'
                    color='secondary'
                    type='email'
                    required
                  />
                  <ReactHookFormTextField
                    defaultValue=''
                    name='Password'
                    control={methods.control}
                    margin='dense'
                    label={language === 'en' ? 'Password' : 'パスワード'}
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
                      {language === 'jp' ? '同録する' : 'Register'}
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
