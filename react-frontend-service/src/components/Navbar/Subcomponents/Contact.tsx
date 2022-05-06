import React from 'react'
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
import CustomAlert from '../../CustomMUI/CustomAlert'
import { useSendMessageMutation } from '../../../redux/services/userAPI'
import { MHFTextField } from 'mui-hook-form-mhf'

type FormData = {
  name: string
  email: string
  message: string
}

type ContactProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Contact = ({ open, setOpen }: ContactProps) => {
  const methods = useForm<FormData>()
  const [message, setMessage] = React.useState('')
  const [buttonLoading, setButtonLoading] = React.useState(false)

  const [sendMessage] = useSendMessageMutation()

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (data: FormData) => {
    setButtonLoading(true)
    let error = await sendMessage(data)

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
              <MHFTextField
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

              <MHFTextField
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

              <MHFTextField
                name='message'
                control={methods.control}
                defaultValue=''
                margin='dense'
                id='message'
                label='Message'
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
