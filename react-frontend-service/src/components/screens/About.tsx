import { Container, Typography, Box, Stack } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

const About = () => {
  const language = useAppSelector((state) => state.language.language)

  return (
    <>
      <Container maxWidth='lg'>
        <Box component='div' sx={{}}>
          <Stack direction='column' spacing={2}>
            <Typography variant='h3' textAlign='center'>
              About Us
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: 16, sm: 22 } }}>
              {language === 'en'
                ? 'Channel Tech is a new and upcoming ECommerce network that focuses on the sale of technological equipment. We attempt to provide lower prices than our competitors to enable those who are less fortunate to experience the power of technology. **NOTE** This website is only a mock-up website that is being created for DEMO/PORTFOLIO use only. Please do not expect any legitimate operations from this domain. Thank you **'
                : 'channel techは技術機器の販売に焦点を当てた、新しく登場するeコマースネットワークです。この会社は相手より技術機器の値段を安くしてみます。恵まれない人々がテクノロジーの力を体験できるように、競合他社よりも低価格を提供するよう努めています。'}
            </Typography>
            <Typography variant='h4' sx={{ fontSize: { xs: 24, sm: 30 } }}>
              Website Details
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: 16, sm: 22 } }}>
              {language === 'en'
                ? "This ECommerce Mockup/Demo was built with React and Golang. Additionally, this project makes use of MongoDB, Material-UI, Redux and many other technologies. The website supports two languages, Japanese and English. Beware the translations may not entirely be of a native level due to the translations being done by myself.  All product specific data was not originally procured by me, the data/images were scraped from the internet. None of the items that appear on this website are for sale from me, nor am I claiming to own any of these items. This website was specifically built to aid in the development of software engineering skills for T. Smith, specifically in the ability to create a fullstack application. To take a deeper look into the application's code, please have a look at https://github.com/teandresmith/channel-tech"
                : 'このeコマースネットワークはReactとGolangで作りました。さらにMongoDBやMaterial-UIやReduxを使っています。このサイトは日本語と英語のサポートがありますが、自分ですべて翻訳したので、日本語の翻訳のエラーがあるかもしれません。'}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default About
