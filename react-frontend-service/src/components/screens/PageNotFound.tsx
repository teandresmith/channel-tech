import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

const PageNotFound = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Typography variant='h4'>Page not found</Typography>
        <Typography variant='h6'>
          Sorry the page you were looking for was unable to be found
        </Typography>
        <Button component={Link} to='/' color='secondary' variant='contained'>
          Home
        </Button>
      </Container>
    </>
  )
}

export default PageNotFound
