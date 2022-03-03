import { Alert } from '@mui/material'
import React from 'react'

const CustomAlert = ({ severity, sx, message }) => {
  return (
    <>
      <Alert severity={severity} sx={sx}>
        {message}
      </Alert>
    </>
  )
}

export default CustomAlert
