import { Copyright } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <Box
        component='div'
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          pt: 3,
          pb: 3,
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Button component={Link} to='/' sx={{ color: 'white' }}>
            Home
          </Button>
          <Button component={Link} to='/shop' sx={{ color: 'white' }}>
            Shop
          </Button>
          <Button component={Link} to='/about' sx={{ color: 'white' }}>
            About
          </Button>
        </Box>
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Copyright fontSize='inherit' sx={{ color: 'white', mr: 0.5 }} />
            <Typography
              variant='inherit'
              sx={{
                color: 'white',
              }}
            >
              2022 channeltech
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default Footer
