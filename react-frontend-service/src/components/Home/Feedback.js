import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Typography,
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import ReactHookFormTextField from '../CustomInputs/ReactHookFormTextField'

const Feedback = () => {
  const [open, setOpen] = useState(false)
  const methods = useForm()

  const onSubmit = (data) => {
    console.log(data)
    methods.setValue('name', '')
    methods.setValue('email', '')
    methods.setValue('feedback', '')
    setOpen(false)
  }

  // Implement React-Form-Hooks

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  return (
    <>
      <Box component='div' sx={{ backgroundColor: 'lavender', pt: 4, pb: 4 }}>
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <Typography
            color='inherit'
            variant='h6'
            fontSize={{ xs: 14, sm: 20 }}
          >
            Have an opinion? Golang would love to hear it!
          </Typography>
          <Button color='inherit' variant='outlined' onClick={handleOpen}>
            Give Feedback
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Give Feedback</DialogTitle>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogContent>
                <DialogContentText>
                  Please help us improve by filling out the form below. We
                  appreciate all feedback from our users!
                </DialogContentText>
                <ReactHookFormTextField
                  defaultValue={'Anon'}
                  name='name'
                  control={methods.control}
                  autoFocus
                  margin={'dense'}
                  label='Name'
                  id='name'
                  fullWidth
                  variant='outlined'
                />
                <ReactHookFormTextField
                  defaultValue={''}
                  name='email'
                  control={methods.control}
                  margin={'dense'}
                  label='Email'
                  id='email'
                  required
                  fullWidth
                  variant='outlined'
                />
                <ReactHookFormTextField
                  defaultValue={''}
                  name='feedback'
                  control={methods.control}
                  margin={'dense'}
                  label='Feedback'
                  id='feedback'
                  fullWidth
                  required
                  multiline
                  variant='outlined'
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button component='button' type='submit'>
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Stack>
      </Box>
    </>
  )
}

export default Feedback
