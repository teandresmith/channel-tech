import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const Loading = () => {
  return (
    <>
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
    </>
  )
}

export default Loading
