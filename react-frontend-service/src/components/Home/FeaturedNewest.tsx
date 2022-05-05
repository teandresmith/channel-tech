import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

type FeaturedNewestProps = {
  headers: Array<string>
  data?: { image: string }
}

const FeaturedNewest = ({ headers }: FeaturedNewestProps) => {
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1543069190-9d380c458bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1515968004492-e6224002d7db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1134&q=80',
    },
  ]
  return (
    <>
      <Box
        component='div'
        sx={{ pt: { xs: 2, sm: 3, md: 4 }, pb: { xs: 2, sm: 3, md: 4 } }}
      >
        <Grid container columnSpacing={1}>
          {data.map((value, index) => (
            <Grid item key={index} xs={6}>
              <Template header={headers[index]} data={value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

type TemplateProps = {
  header: string
  data?: { image: string }
}

const Template = ({ header, data }: TemplateProps) => {
  const language = useAppSelector((state) => state.language.language)
  return (
    <>
      <Typography variant='h6' fontSize={{ md: 24 }}>
        {header}
      </Typography>
      <Box
        component={Link}
        to={`/shop?category=${header}&lang=${language}`}
        sx={{
          textDecoration: 'none',
          height: '100%',
        }}
      >
        <Box
          component='img'
          src={data?.image}
          sx={{
            height: { xs: 300, sm: 600 },
            objectFit: 'cover',
            width: '100%',
            borderRadius: 1,
          }}
        />
      </Box>
    </>
  )
}

export default FeaturedNewest
