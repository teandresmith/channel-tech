import React from 'react'
import { Controller } from 'react-hook-form'
import { Select, InputLabel, FormControl, MenuItem } from '@mui/material'

const ReactHookFormSelect = ({
  defaultValue,
  name,
  control,
  labelId,
  label,
  selectId,
  selectData,
  fullWidth,
  formControlSx,
  selectSx,
  required,
  color,
}) => {
  return (
    <>
      <FormControl
        fullWidth={fullWidth ? true : false}
        sx={formControlSx ? formControlSx : {}}
        required={required ? true : false}
      >
        <InputLabel id={labelId} color={color ? color : 'primary'}>
          {label}
        </InputLabel>
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              labelId={labelId}
              id={selectId}
              label={label}
              sx={selectSx ? selectSx : {}}
              color={color ? color : 'primary'}
              {...field}
            >
              {selectData.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  )
}

export default ReactHookFormSelect
