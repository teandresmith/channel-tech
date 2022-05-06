import React from 'react'
import {
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Box,
  Pagination,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useSearchParams } from 'react-router-dom'
import { sortProducts } from '../../redux/states/productState'
import ProductList from './Filtered/ProductList'
import Categories from './Filtered/Categories'
import SubFilters from './Filtered/SubFilters'
import { setPagination, setSubFilters } from '../../redux/states/urlFilters'

const Filtered = () => {
  const [sortBy, setSortBy] = React.useState('none')
  const sortingMethods = ['A-Z', 'Z-A', 'Price (low)', 'Price (high)']

  let [searchParams] = useSearchParams()
  let category = searchParams.get('category')
  let subCategory = searchParams.get('subcategory')
  let subFilters = searchParams.get('subfilters')

  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.value)
  const pagination = useAppSelector((state) => state.urlFilters.pagination)

  // Sort By MUI Menu Component Handlers/Functions
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handlePositionClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handles the Sorting of the Product State
  const handleSortBySelection = (selection: string) => {
    setSortBy(selection)
    dispatch(
      sortProducts({
        sortBy: selection.toUpperCase(),
        products: [...products],
      })
    )
    setAnchorEl(null)

    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )
  }

  const handleClearSortSelection = () => {
    setSortBy('none')

    dispatch(
      sortProducts({
        sortBy: 'A-Z',
        products: [...products],
      })
    )

    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )
  }

  // Handles all data being handled by Pagination.
  const handlePagination = (event: any, value: number) => {
    dispatch(
      setPagination({
        page: value,
        dataskip: calculateSkip(value),
      })
    )
    window.scrollTo({
      top: 0,
    })
  }

  const calculateSkip = (value: number) => {
    let skip = (value - 1) * pagination.productsPerPage
    if (value === 1) {
      skip = 0
    }
    return skip
  }

  React.useEffect(() => {
    dispatch(
      setSubFilters({
        subFilters: subFilters ? subFilters.split(',') : [],
      })
    )
  }, [])

  return (
    <>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignContent='center'
        sx={{ pb: 3 }}
      >
        <Typography
          component='div'
          variant='h4'
          sx={{ fontSize: { xs: 22, sm: 34 } }}
        >
          {category}
        </Typography>
        <Stack direction='row' spacing={{ xs: 0, sm: 1 }}>
          <Button
            variant='text'
            onClick={(e) => handlePositionClick(e)}
            color='inherit'
            sx={{ fontSize: { xs: 12, sm: 14 } }}
          >
            {sortBy === 'none' ? 'Sort By' : `${sortBy}`}
          </Button>
          {sortBy !== 'none' && (
            <Button
              variant='text'
              onClick={() => handleClearSortSelection()}
              color='secondary'
              sx={{ fontSize: { xs: 10, sm: 14 } }}
            >
              Clear Sort Selection
            </Button>
          )}
          <Menu
            aria-labelledby='sort-button'
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {sortingMethods.map((item) => (
              <MenuItem key={item} onClick={() => handleSortBySelection(item)}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{ height: '100%' }}
      >
        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '20%' },
            position: 'sticky',
            top: { xs: 53, sm: 63, md: 100 },
            left: 0,
            height: { xs: '100%', md: '85vh' },
            overflowY: { xs: 'auto', md: 'scroll' },
            '::-webkit-scrollbar': { width: '10px' },
            '::-webkit-scrollbar-track': {
              padding: '2px 0',
            },
            '::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              backgroundColor: 'darkgrey',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'darkgrey white',
          }}
        >
          <Box
            component='div'
            sx={{
              display: { xs: 'flex', md: 'inline' },
              justifyContent: { xs: 'center', md: 'normal' },
              backgroundColor: { xs: 'white' },
            }}
          >
            <Categories category={category} setSortBy={setSortBy} />
            <SubFilters
              category={category as string}
              subCategory={subCategory as string}
              setSortBy={setSortBy}
            />
          </Box>
        </Box>
        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '80%' },
            height: '100%',
            pl: 2,
            pr: 2,
          }}
        >
          {/* 
            Product Grid
          */}

          <ProductList />

          {/* 
            Pagination Component / Styling
          */}
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              pt: 2,
              pb: 2,
            }}
          >
            <Pagination
              count={Math.ceil(products?.length / pagination.productsPerPage)}
              page={pagination.page}
              onChange={handlePagination}
              siblingCount={2}
            />
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default Filtered
