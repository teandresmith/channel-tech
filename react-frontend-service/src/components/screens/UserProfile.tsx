import React from 'react'
import {
  Container,
  Stack,
  Box,
  List,
  ListItemText,
  Typography,
  ListItemIcon,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material'
import { LocalShipping, Person, ShoppingBag } from '@mui/icons-material'
import PersonalInfo from '../UserProfile/PersonalInfo'
import ShippingAddress from '../UserProfile/ShippingAddress'
import Orders from '../UserProfile/Orders'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByIDQuery } from '../../redux/services/userAPI'
import ServerError from './ServerError'
import Loading from '../Loading'
import Cookies from 'js-cookie'

const UserProfile = () => {
  const [activeTab, setActiveTab] = React.useState(0)
  const language = useAppSelector((state) => state.language.language)

  const params = useParams()
  const navigate = useNavigate()

  const headers = {
    token: Cookies.get('Token'),
    refreshToken: Cookies.get('RefreshToken'),
  }

  const {
    data: userInfo,
    isLoading,
    error,
  } = useGetUserByIDQuery({ userID: params.userid, headers: headers })

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const tabs = [
    {
      text: language === 'en' ? 'Personal Info' : '個人情報',
      icon: <Person />,
    },
    {
      text: language === 'en' ? 'Shipping Address' : '配達住所',
      icon: <LocalShipping />,
    },
    {
      text: language === 'en' ? 'Orders' : '注文歴史',
      icon: <ShoppingBag />,
    },
  ]

  const handleListItemClick = (event: any, index: number) => {
    setActiveTab(index)
  }

  const displayActiveTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <PersonalInfo userQueryData={userInfo?.result} headers={headers} />
        )
      case 1:
        return (
          <ShippingAddress userQueryData={userInfo?.result} headers={headers} />
        )
      case 2:
        return <Orders userQueryData={userInfo?.result} />
      default:
        break
    }
  }

  React.useEffect(() => {
    if (error) {
      navigate('/login')
    }
  }, [error, navigate])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ServerError buttonText={'Login'} buttonLink={'/login'} />
      ) : (
        <Container maxWidth='lg'>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ width: '100%' }}
          >
            {matches ? (
              <>
                <Tabs
                  variant='fullWidth'
                  value={activeTab}
                  onChange={handleListItemClick}
                  indicatorColor='secondary'
                  textColor='inherit'
                  sx={{}}
                >
                  {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.text} />
                  ))}
                </Tabs>
              </>
            ) : (
              <>
                <Box
                  component='div'
                  sx={{
                    position: 'sticky',
                    height: '85vh',
                    width: '20%',
                    top: 100,
                  }}
                >
                  <List
                    subheader={
                      <Typography variant='h5'>
                        {language === 'en'
                          ? 'Account Details'
                          : 'アカウント詳細'}
                      </Typography>
                    }
                    sx={{
                      '& .MuiListItemButton-root.Mui-selected:hover': {
                        backgroundColor: 'lavender',
                      },
                      '& .MuiListItemButton-root.Mui-selected': {
                        backgroundColor: 'lavender',
                      },
                      '& .MuiListItemButton-root:hover': {
                        backgroundColor: 'lightgrey',
                      },
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <ListItemButton
                        selected={activeTab === index}
                        key={index}
                        divider
                        onClick={(event) => handleListItemClick(event, index)}
                      >
                        <ListItemIcon>{tab.icon}</ListItemIcon>
                        <ListItemText primary={tab.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </>
            )}

            <Box
              component='div'
              sx={{
                width: { xs: '100%', md: '80%' },
              }}
            >
              {displayActiveTab()}
            </Box>
          </Stack>
        </Container>
      )}
    </>
  )
}

export default UserProfile
