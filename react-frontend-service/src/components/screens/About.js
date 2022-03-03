import { Container, Typography, Box, Stack } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Box component='div' sx={{}}>
          <Stack direction='column' spacing={2}>
            <Typography variant='h3' textAlign='center'>
              About Us
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: 16, sm: 22 } }}>
              Channel Tech is a new and upcoming ECommerce network that focuses
              on the sale of technological equipment. We attempt to provide
              lower prices than our competitors to enable those who are less
              fortunate to experience the power of technology. **NOTE** This
              website is only a mock-up website that is being created for
              DEMO/PORTFOLIO use only. Please do not expect any legitimate
              operations from this domain. Thank you **
            </Typography>
            <Typography variant='h4' sx={{ fontSize: { xs: 24, sm: 30 } }}>
              Website Details
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: 16, sm: 22 } }}>
              This ECommerce Mockup/Demo was built with React and Golang.
              Additionally, this project makes use of MongoDB as a database,
              Material UI as a design system, and Redux Toolkit as a State
              Management system. The website supports two languages, Japanese
              and English. Beware the translations may not entirely be of a
              native level due to the translations being done by myself. Another
              note to add is that all of the category information is static to
              assist with supporting both languages. All product specific data
              was not originally procured by me, the data/images were scraped
              from the internet. None of the items that appear on this website
              are for sale from me, nor am I claiming to own any of these items.
              Lastly, changing the language while on a specific product's page
              will not result in any translations on the page because for each
              item displayed, there are two separate listings within the
              database. One with english details and the other with japanese
              details. This website was specifically built to aid in the
              development of software engineering skills for T. Smith,
              specifically in the ability to create a fullstack application. To
              take a deeper look into the application's code, please have a look
              at *INSERT GITHUB LINK HERE*
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default About
