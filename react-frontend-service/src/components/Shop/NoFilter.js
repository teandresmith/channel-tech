import React, { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearProducts, sortProducts } from '../../redux/states/productState'
import UnFilteredProductList from './NoFilter/UnFilteredProductList'
import NoFilterCategories from './NoFilter/NoFilterCategories'
import { setPagination } from '../../redux/states/urlFilters'

const NoFilter = ({ data }) => {
  const [sortBy, setSortBy] = useState('none')
  const sortingMethods = ['A-Z', 'Z-A', 'Price (low)', 'Price (high)']

  const pagination = useSelector((state) => state.urlFilters.pagination)

  const dispatch = useDispatch()

  // Anchors used for the SortBy MUI Menu Component
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handlePositionClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Pagination Handlers / Functions
  const handlePagination = (event, value) => {
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

  const calculateSkip = (value) => {
    let skip = (value - 1) * pagination.productsPerPage
    if (value === 1) {
      skip = 0
    }
    return skip
  }

  const handleSortBySelection = (selection) => {
    setSortBy(selection)
    dispatch(
      sortProducts({
        sortBy: selection.toUpperCase(),
        products: data,
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
    dispatch(clearProducts())
    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )
  }

  useEffect(() => {
    dispatch(clearProducts())
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
          All Products
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
            onClose={(e) => handleMenuClose(e)}
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
            <NoFilterCategories />
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
          <UnFilteredProductList data={data} />

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
              count={Math.ceil(data.length / pagination.productsPerPage)}
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

export default NoFilter
