import React from 'react'
import { Typography, Grid, Box } from '@mui/material'
import {
  Laptop,
  DesktopMac,
  SpeakerGroup,
  PhoneIphone,
  TvRounded,
  ShoppingBag,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const ShoppingCategory = () => {
  const languageData = useAppSelector((state) => state.language.languageData)

  return (
    <>
      <Box
        component='div'
        sx={{ pt: { xs: 2, sm: 3, md: 4 }, pb: { xs: 2, sm: 3, md: 4 } }}
      >
        <Typography
          variant='h4'
          fontSize={{ xs: 24, sm: 34 }}
          sx={{ textAlign: 'center', pb: 1 }}
        >
          Shop by Category
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          justifyContent='center'
          alignItems='center'
        >
          {languageData.Shop.Home.ShoppingCategories.map((category) => (
            <Grid item key={category.category} xs={6} sm={4}>
              <CustomCategory data={category} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

type CustomCategoryProps = {
  data: { category: string; url: string }
}

const CustomCategory = ({ data }: CustomCategoryProps) => {
  const setIcon = (iconString: string) => {
    switch (iconString) {
      case 'Laptops':
      case 'ノートパソコン':
        return <Laptop />

      case 'Desktops':
      case 'パソコン':
        return <DesktopMac />

      case 'Sound Systems':
      case 'スピーカー':
        return <SpeakerGroup />

      case 'Mobile Phones':
      case '携帯電話':
        return <PhoneIphone />

      case 'TVs':
      case 'テレビ':
        return <TvRounded />

      case 'Shop All':
        return <ShoppingBag />

      default:
        break
    }
  }

  return (
    <>
      <Box
        component='div'
        sx={{
          backgroundColor: 'lightblue',
          borderRadius: 2,
          border: '1px solid lightblue',
        }}
      >
        <Box
          component={Link}
          to={data?.url}
          sx={{
            textDecoration: 'none',
            color: 'black',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: { xs: 1, sm: 2 },
            }}
          >
            {setIcon(data?.category)}
            <Typography
              variant='h6'
              fontSize={{ xs: 14, sm: 18, md: 20 }}
              sx={{ pl: 1 }}
            >
              {data?.category}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ShoppingCategory
