import React, { useState } from 'react'
import {
  ListItem,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Menu,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSubFilters, setPagination } from '../../../redux/states/urlFilters'

const NoFilterCategories = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const languageData = useSelector((state) => state.language.languageData)
  const language = useSelector((state) => state.language.language)

  const dispatch = useDispatch()

  const handleCategoryChange = () => {
    dispatch(
      setSubFilters({
        subFilters: [],
      })
    )
    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )
  }

  const checkCategoryIteration = (category) => {
    var categoryItems = []
    switch (category) {
      case 'Computers':
      case 'パソコン':
        categoryItems = languageData.Shop.Computers
        break
      case 'Phones':
      case '電話':
        categoryItems = languageData.Shop.Phones
        break
      case 'Entertainment':
      case '電気機器':
        categoryItems = languageData.Shop.Entertainment
        break
      case 'Featured Products':
      case 'Newest Products':
      case 'Top Rated Products':
      case 'おすすめ商品':
      case '新しい商品':
      case '一番商品':
        return
      default:
        break
    }

    return (
      <>
        {categoryItems.map((value, index) => (
          <ListItem
            component={Link}
            to={`/shop?category=${category}&subcategory=${value}&lang=${language}`}
            key={index}
            onClick={() => handleCategoryChange()}
            sx={{ textDecoration: 'none', color: '#000000DE' }}
          >
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </>
    )
  }

  return (
    <>
      {matches ? (
        <MobileNoFilterCategories />
      ) : (
        languageData.Shop.AllProductCategories.map((category) => (
          <Accordion
            key={category}
            sx={{ backgroundColor: 'white', boxShadow: 'none' }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant='h5'>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {checkCategoryIteration(category)}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  )
}

export default NoFilterCategories

const MobileNoFilterCategories = () => {
  const [computerAnchorEl, setComputerAnchorEl] = useState(null)
  const computerOpen = Boolean(computerAnchorEl)

  const [phoneAnchorEl, setPhoneAnchorEl] = useState(null)
  const phoneOpen = Boolean(phoneAnchorEl)

  const [entertainmentAnchorEl, setEntertainmentAnchorEl] = useState(null)
  const entertainmentOpen = Boolean(entertainmentAnchorEl)

  const languageData = useSelector((state) => state.language.languageData)
  const language = useSelector((state) => state.language.language)

  const dispatch = useDispatch()

  const handleComputerAnchor = (event) => {
    setComputerAnchorEl(event.currentTarget)
  }

  const handlePhoneAnchor = (event) => {
    setPhoneAnchorEl(event.currentTarget)
  }

  const handleEntertainmentAnchor = (event) => {
    setEntertainmentAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setComputerAnchorEl(null)
    setPhoneAnchorEl(null)
    setEntertainmentAnchorEl(null)
    dispatch(
      setSubFilters({
        subFilters: [],
      })
    )

    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )
  }

  const checkCategoryIteration = (category) => {
    var categoryItems = []
    switch (category) {
      case 'Computers':
      case 'パソコン':
        categoryItems = languageData.Shop.Computers
        break
      case 'Phones':
      case '電話':
        categoryItems = languageData.Shop.Phones
        break
      case 'Entertainment':
      case '電気機器':
        categoryItems = languageData.Shop.Entertainment
        break
      case 'Featured Products':
      case 'Newest Products':
      case 'Top Rated Products':
      case 'おすすめ商品':
      case '新しい商品':
      case '一番商品':
        return
      default:
        break
    }

    return categoryItems.map((value, index) => (
      <MenuItem
        key={index}
        component={Link}
        to={`/shop?category=${category}&subcategory=${value}&lang=${language}`}
        onClick={handleClose}
      >
        {value}
      </MenuItem>
    ))
  }

  return (
    <>
      <Button onClick={(e) => handleComputerAnchor(e)} color='inherit'>
        {language === 'en' ? 'Computers' : 'パソコン'}
      </Button>
      <Menu
        id='Computer-menu'
        anchorEl={computerAnchorEl}
        open={computerOpen}
        onClose={handleClose}
      >
        {checkCategoryIteration(language === 'en' ? 'Computers' : 'パソコン')}
      </Menu>
      <Button onClick={(e) => handlePhoneAnchor(e)} color='inherit'>
        {language === 'en' ? 'Phones' : '電話'}
      </Button>
      <Menu
        id='Phones-menu'
        anchorEl={phoneAnchorEl}
        open={phoneOpen}
        onClose={handleClose}
      >
        {checkCategoryIteration(language === 'en' ? 'Phones' : '電話')}
      </Menu>
      <Button onClick={(e) => handleEntertainmentAnchor(e)} color='inherit'>
        {language === 'en' ? 'Entertainment' : '電気機器'}
      </Button>
      <Menu
        id='Entertainment-menu'
        anchorEl={entertainmentAnchorEl}
        open={entertainmentOpen}
        onClose={handleClose}
      >
        {checkCategoryIteration(
          language === 'en' ? 'Entertainment' : '電気機器'
        )}
      </Menu>
    </>
  )
}
