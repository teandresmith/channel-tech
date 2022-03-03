import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const ReactHookFormTextField = ({
  defaultValue,
  name,
  control,
  autoFocus,
  margin,
  label,
  id,
  fullWidth,
  multiline,
  variant,
  required,
  sx,
  color,
  helperText,
  type,
  inputProps,
}) => {
  return (
    <>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            autoFocus={autoFocus ? true : false}
            margin={margin ? margin : 'none'}
            label={label}
            id={id}
            fullWidth={fullWidth ? true : false}
            variant={variant}
            multiline={multiline ? true : false}
            required={required ? true : false}
            sx={sx ? sx : {}}
            type={type ? type : 'text'}
            color={color ? color : 'primary'}
            helperText={helperText ? helperText : ''}
            inputProps={inputProps ? inputProps : {}}
            {...field}
          />
        )}
      />
    </>
  )
}

export default ReactHookFormTextField
