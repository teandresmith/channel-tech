import React from 'react'
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
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setPagination, setSubFilters } from '../../../redux/states/urlFilters'

type CategoriesProps = {
  category: string | null
  setSortBy: React.Dispatch<React.SetStateAction<string>>
}

const Categories = ({ category, setSortBy }: CategoriesProps) => {
  const [categories, setCategories] = React.useState([''])

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const languageData = useAppSelector((state) => state.language.languageData)
  const language = useAppSelector((state) => state.language.language)
  const dispatch = useAppDispatch()

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

  const checkCategoryIteration = (category: string) => {
    var categoryItems: Array<string> = []
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

  React.useEffect(() => {
    if (category) {
      setCategories([category])
    }
  }, [category])

  return (
    <>
      {matches ? (
        <MobileCategories category={category} setSortBy={setSortBy} />
      ) : (
        categories.map((category: string) => (
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

const MobileCategories = ({ category, setSortBy }: CategoriesProps) => {
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null)
  const categoryOpen = Boolean(categoryAnchorEl)

  const languageData = useAppSelector((state) => state.language.languageData)
  const language = useAppSelector((state) => state.language.language)
  const dispatch = useAppDispatch()

  const handleCategoryAnchor = (event: any) => {
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

  const checkCategoryIteration = (category: string) => {
    var categoryItems: Array<string> = []
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
        {checkCategoryIteration(category as string)}
      </Menu>
    </>
  )
}

export default Categories
