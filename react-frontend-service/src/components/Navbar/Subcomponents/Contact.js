import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import ReactHookFormTextField from '../../CustomInputs/ReactHookFormTextField'
import CustomAlert from '../../CustomMUI/CustomAlert'
import { useSendMessageMutation } from '../../../redux/services/userAPI'

const Contact = ({ open, setOpen }) => {
  const methods = useForm()
  const [message, setMessage] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const [sendMessage] = useSendMessageMutation()

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (data) => {
    setButtonLoading(true)
    let { error } = await sendMessage(data)

    setButtonLoading(false)

    if (error) {
      setMessage(
        'There was an error while trying to send that message. Please try again.'
      )
    } else {
      methods.setValue('name', 'Anon')
      methods.setValue('email', '')
      methods.setValue('message', '')
      setMessage('')
      setOpen(false)
    }
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Us</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent>
              {message !== '' && (
                <CustomAlert severity={'error'} message={message} />
              )}
              <DialogContentText>
                Please fill out the form below and we will try to reach out to
                you ASAP!
              </DialogContentText>
              <ReactHookFormTextField
                defaultValue='Anon'
                name='name'
                control={methods.control}
                autoFocus
                margin='dense'
                label='Name'
                id='name'
                fullWidth
                required
                variant='outlined'
                color='secondary'
              />

              <ReactHookFormTextField
                name='email'
                control={methods.control}
                defaultValue=''
                margin='dense'
                id='email'
                label='Email'
                type='email'
                required
                fullWidth
                variant='outlined'
                color='secondary'
              />

              <ReactHookFormTextField
                name='message'
                control={methods.control}
                defaultValue=''
                margin='dense'
                id='message'
                label='Message'
                type='message'
                required
                fullWidth
                multiline
                variant='outlined'
                color='secondary'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='info'>
                Cancel
              </Button>
              <LoadingButton
                loading={buttonLoading}
                loadingIndicator={'Sending...'}
                type='submit'
                color='inherit'
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  )
}

export default Contact
