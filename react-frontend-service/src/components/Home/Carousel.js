import React, { useState } from 'react'
import { Stack, Box } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../Home/Pagination'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Carousel = () => {
  const [activeStep, setActiveStep] = useState(0)

  const carouselData = [
    {
      image:
        'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      sx: {
        display: 'block',
        width: { xs: '100%' },
        overflow: 'hidden',
        objectFit: 'cover',
        objectPosition: 'bottom',
        height: { xs: 375, sm: 525, md: 600 },
      },
    },
    {
      image:
        'https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
      sx: {
        display: 'block',
        width: { xs: '100%' },
        overflow: 'hidden',
        objectFit: 'cover',
        objectPosition: 'center',
        height: { xs: 375, sm: 525, md: 600 },
      },
    },
    {
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      sx: {
        display: 'block',
        width: { xs: '100%' },
        overflow: 'hidden',
        objectFit: 'cover',
        objectPosition: 'center',
        height: { xs: 375, sm: 525, md: 600 },
      },
    },
  ]

  const handleOnChangeStep = (step) => {
    setActiveStep(step)
  }
  return (
    <>
      <Box component='div'>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleOnChangeStep}
        >
          {carouselData.map((image) => (
            <Box component={'div'} key={image.image}>
              <Box component='img' src={image.image} sx={image.sx} />
            </Box>
          ))}
        </AutoPlaySwipeableViews>
      </Box>

      <Stack
        direction='row'
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          pt: 1,
        }}
      >
        <Pagination
          count={carouselData.length}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Stack>
    </>
  )
}

export default Carousel
