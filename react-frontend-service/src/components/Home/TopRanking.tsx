import React from 'react'
import { Typography, Box, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { Product } from '../../redux/types/Types'

type TopRankingProps = {
  title: string
  topRanking: Array<Product>
}

const TopRanking = ({ title, topRanking }: TopRankingProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Box
        component='div'
        sx={{ pt: { xs: 2, sm: 3, md: 4 }, pb: { xs: 2, sm: 3, md: 4 } }}
      >
        <Typography
          variant='h4'
          textAlign='center'
          fontSize={{ xs: 24, sm: 34 }}
        >
          {title}
        </Typography>
        <Grid
          container
          columnGap={{ xs: 1, md: 3 }}
          justifyContent={matches ? 'space-between' : 'center'}
          alignItems={matches ? 'space-between' : 'center'}
          sx={{ pt: 2 }}
        >
          {matches
            ? topRanking.slice(0, 3).map((value) => (
                <Grid item xs={'auto'} key={value?.productId}>
                  <Box component={Link} to={`/products/${value?.name}`}>
                    <Box
                      component='img'
                      src={value?.image}
                      sx={{
                        width: { xs: 80 },
                        objectFit: 'contain',
                        height: 100,
                      }}
                    />
                  </Box>
                </Grid>
              ))
            : topRanking.map((value) => (
                <Grid item xs={'auto'} key={value?.productId}>
                  <Box component={Link} to={`/products/${value?.name}`}>
                    <Box
                      component='img'
                      src={value?.image}
                      sx={{
                        width: { sm: 100, md: 150, lg: 200 },
                        objectFit: 'contain',
                        height: { sm: 100, md: 150, lg: 200 },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  )
}

export default TopRanking
