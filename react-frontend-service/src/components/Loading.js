import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ open }) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='secondary' />
      </Backdrop>
    </>
  )
}

export default Loading
