import React from 'react'
import { Backdrop, CircularProgress, Box, Typography } from '@mui/material'

const Loading = ({ open }) => {
  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      > */}
      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color='secondary' />
      </Box>

      {/* </Backdrop> */}
    </>
  )
}

export default Loading
