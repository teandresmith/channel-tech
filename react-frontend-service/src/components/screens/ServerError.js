import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

const ServerError = ({ text, buttonText, buttonLink }) => {
  return (
    <>
      <Container maxWidth='lg'>
        <Typography variant='h4'>Server Error</Typography>
        <Typography variant='h6'>
          {text
            ? text
            : 'Oops, looks like something went wrong while trying to get the page data.'}
        </Typography>
        <Button
          component={Link}
          to={buttonLink ? buttonLink : '/'}
          color='secondary'
          variant='contained'
        >
          {buttonText ? buttonText : 'Home'}
        </Button>
      </Container>
    </>
  )
}

export default ServerError
