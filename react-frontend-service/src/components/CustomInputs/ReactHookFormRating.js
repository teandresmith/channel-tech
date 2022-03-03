import React from 'react'
import { Controller } from 'react-hook-form'
import { Rating } from '@mui/material'

const ReactHookFormRating = ({ control }) => {
  return (
    <>
      <Controller
        defaultValue={'5'}
        name='rating'
        control={control}
        render={({ field }) => (
          <Rating
            id='rating'
            precision={0.5}
            value={parseFloat(field.value)}
            required
            onChange={field.onChange}
            name={field.name}
            ref={field.ref}
          />
        )}
      />
    </>
  )
}

export default ReactHookFormRating
