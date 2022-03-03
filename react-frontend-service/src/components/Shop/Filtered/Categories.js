import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  Typography,
  MenuItem,
  Menu,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPagination, setSubFilters } from '../../../redux/states/urlFilters'

const Categories = ({ category, setSortBy }) => {
  const [categories, setCategories] = useState([])

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
    setSortBy('none')
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
            onClick={() => handleCategoryChange()}
            key={index}
            sx={{ textDecoration: 'none', color: '#000000DE' }}
          >
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </>
    )
  }

  useEffect(() => {
    if (category) {
      setCategories([category])
    }
  }, [category])

  return (
    <>
      {matches ? (
        <MobileCategories category={category} setSortBy={setSortBy} />
      ) : (
        categories.map((category) => (
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

export default Categories

const MobileCategories = ({ category, setSortBy }) => {
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null)
  const categoryOpen = Boolean(categoryAnchorEl)

  const languageData = useSelector((state) => state.language.languageData)
  const language = useSelector((state) => state.language.language)
  const dispatch = useDispatch()

  const handleCategoryAnchor = (event) => {
    setCategoryAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setCategoryAnchorEl(null)
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
    setSortBy('none')
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
      <Button onClick={(e) => handleCategoryAnchor(e)} color='inherit'>
        {category}
      </Button>
      <Menu
        id={`${category}-menu`}
        anchorEl={categoryAnchorEl}
        open={categoryOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        {checkCategoryIteration(category)}
      </Menu>
    </>
  )
}
