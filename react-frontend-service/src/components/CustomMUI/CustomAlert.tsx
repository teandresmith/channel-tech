import { Alert, AlertColor, SxProps, Theme } from '@mui/material'
import React from 'react'

type CustomAlertProps = {
  severity: AlertColor
  sx?: SxProps<Theme>
  message: string
}

const CustomAlert = ({ severity, sx, message }: CustomAlertProps) => {
  return (
    <>
      <Alert severity={severity} sx={sx}>
        {message}
      </Alert>
    </>
  )
}

export default CustomAlert
