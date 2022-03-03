import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Menu,
  Button,
  MenuItem,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPagination, setSubFilters } from '../../../redux/states/urlFilters'

const SubFilters = ({ category, subCategory, setSortBy }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const language = useSelector((state) => state.language.language)
  const languageData = useSelector((state) => state.language.languageData)
  const subFilters = useSelector((state) => state.urlFilters.subFilters)

  const dispatch = useDispatch()

  const loadData = (subFilter, data) => {
    let obj = {}
    for (var items in data) {
      obj[`${subFilter}*${data[items]}`] = false
    }

    return obj
  }

  const priceData = {
    'Prices*100': false,
    'Prices*250': false,
    'Prices*500': false,
    'Prices*1000': false,
    'Prices*1500': false,
    'Prices*10000': false,
    'Prices*25000': false,
    'Prices*50000': false,
    'Prices*100000': false,
    'Prices*150000': false,
  }

  const [priceFilter, setPriceFilter] = useState(priceData)
  const [brandFilter, setBrandFilter] = useState(
    loadData('Brands', languageData.Shop.Brands)
  )

  const handleCheckFilter = (e) => {
    // let filterCopy = [...filters]
    let filterCopy = [...subFilters]
    if (e.target.checked) {
      if (e.target.name.includes('Prices')) {
        filterCopy = filterCopy.filter((item) => !item.includes('Prices'))
        for (var key in priceFilter) {
          if (key !== e.target.name) {
            priceFilter[key] = false
          } else {
            priceFilter[key] = true
          }
        }
        filterCopy.push(e.target.name)
      } else {
        setBrandFilter((prevState) => ({ ...prevState, [e.target.name]: true }))
        filterCopy.push(e.target.name)
      }
    } else if (e.target.name.includes('Prices') && !e.target.checked) {
      setPriceFilter((prevState) => ({ ...prevState, [e.target.name]: false }))

      filterCopy = filterCopy.filter((item) => item !== e.target.name)
    } else {
      setBrandFilter((prevState) => ({ ...prevState, [e.target.name]: false }))
      filterCopy = filterCopy.filter((item) => item !== e.target.name)
    }

    dispatch(
      setSubFilters({
        subFilters: filterCopy,
      })
    )

    dispatch(
      setPagination({
        page: 1,
        dataskip: 0,
      })
    )

    setSortBy('none')

    if (!subCategory && filterCopy.length === 0) {
      navigate(`/shop?category=${category}&lang=${language}`)
    } else if (filterCopy.length === 0) {
      navigate(
        `/shop?category=${category}&subcategory=${subCategory}&lang=${language}`
      )
    } else if (!subCategory && filterCopy.length !== 0) {
      navigate(
        `/shop?category=${category}&subfilters=${filterCopy.map(
          (filter) => filter
        )}&lang=${language}`
      )
    } else {
      navigate(
        `/shop?category=${category}&subcategory=${subCategory}&subfilters=${filterCopy.map(
          (filter) => filter
        )}&lang=${language}`
      )
    }
  }

  useEffect(() => {
    if (subFilters.length !== 0) {
      let brands = []
      let price = []

      subFilters.map((filter) =>
        filter.includes('Brands') ? brands.push(filter) : price.push(filter)
      )

      if (brands.length !== 0) {
        for (var keys in brandFilter) {
          brands.map((brand) =>
            keys === brand
              ? setBrandFilter((prevState) => ({ ...prevState, [brand]: true }))
              : null
          )
        }
      }

      if (price.length !== 0) {
        for (var key in priceFilter) {
          if (key === price[0]) {
            setPriceFilter((prevState) => ({ ...prevState, [price[0]]: true }))
          }
        }
      }
    }

    if (subFilters.length === 0) {
      setBrandFilter(loadData('Brands', languageData.Shop.Brands))
      setPriceFilter(priceData)
    }
  }, [subFilters, languageData, language])

  return (
    <>
      {matches ? (
        <SubFiltersMobile
          priceFilter={priceFilter}
          brandFilter={brandFilter}
          handleCheckFilter={handleCheckFilter}
        />
      ) : (
        <>
          <Accordion sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant='h5'>
                {language === 'en' ? 'Brands' : 'ブランド'}
              </Typography>
            </AccordionSummary>
            {languageData.Shop.Brands.map((brand) => (
              <AccordionDetails key={brand}>
                <FormGroup sx={{ pl: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleCheckFilter}
                        checked={brandFilter[`Brands*${brand}`]}
                        name={`Brands*${brand}`}
                      />
                    }
                    label={brand}
                  />
                </FormGroup>
              </AccordionDetails>
            ))}
          </Accordion>
          <Accordion sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant='h5'>
                {language === 'en' ? 'Prices' : '価格'}
              </Typography>
            </AccordionSummary>
            {languageData.Shop.Prices.map((price) => (
              <AccordionDetails key={price}>
                <FormGroup sx={{ pl: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleCheckFilter}
                        checked={priceFilter[`Prices*${String(price)}`]}
                        name={`Prices*${String(price)}`}
                      />
                    }
                    label={language === 'en' ? `< $${price}` : `< ¥${price}`}
                  />
                </FormGroup>
              </AccordionDetails>
            ))}
          </Accordion>
        </>
      )}
    </>
  )
}

export default SubFilters

const SubFiltersMobile = ({ priceFilter, brandFilter, handleCheckFilter }) => {
  const languageData = useSelector((state) => state.language.languageData)
  const language = useSelector((state) => state.language.language)

  const [brandAnchorEl, setBrandAnchorEl] = useState(null)
  const brandOpen = Boolean(brandAnchorEl)

  const [priceAnchorEl, setPriceAnchorEl] = useState(null)
  const priceOpen = Boolean(priceAnchorEl)

  const handleBrandAnchor = (event) => {
    setBrandAnchorEl(event.currentTarget)
  }

  const handlePriceAnchor = (event) => {
    setPriceAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    if (brandAnchorEl !== null) {
      setBrandAnchorEl(null)
    } else if (priceAnchorEl !== null) {
      setPriceAnchorEl(null)
    }
  }

  const checkCategoryIteration = (category) => {
    var categoryItems
    var currencySign = '$'
    switch (category) {
      case 'Brands':
      case 'ブランド':
        categoryItems = languageData.Shop.Brands
        break
      case 'Prices':
      case '価格':
        categoryItems = languageData.Shop.Prices
        if (category === '価格') {
          currencySign = '¥'
        }
        break
      default:
        break
    }

    return categoryItems.map((value, index) => (
      <MenuItem key={index} onClick={handleClose}>
        <FormGroup sx={{ pl: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckFilter}
                checked={
                  category === 'Brands' || category === 'ブランド'
                    ? brandFilter[`Brands*${value}`]
                    : priceFilter[`Prices*${value}`]
                }
                name={
                  category === 'Brands' || category === 'ブランド'
                    ? `Brands*${value}`
                    : `Prices*${value}`
                }
              />
            }
            label={
              category === 'Prices' || category === '価格'
                ? `< ${currencySign}${value}`
                : value
            }
          />
        </FormGroup>
      </MenuItem>
    ))
  }
  return (
    <>
      <Button onClick={(e) => handleBrandAnchor(e)} color='inherit'>
        {language === 'en' ? 'Brands' : 'ブランド'}
      </Button>
      <Menu
        id='brand-menu'
        anchorEl={brandAnchorEl}
        open={brandOpen}
        onClose={handleClose}
      >
        {checkCategoryIteration(language === 'en' ? 'Brands' : 'ブランド')}
      </Menu>
      <Button onClick={(e) => handlePriceAnchor(e)} color='inherit'>
        {language === 'en' ? 'Prices' : '価格'}
      </Button>
      <Menu
        id='price-menu'
        anchorEl={priceAnchorEl}
        open={priceOpen}
        onClose={handleClose}
      >
        {checkCategoryIteration(language === 'en' ? 'Prices' : '価格')}
      </Menu>
    </>
  )
}
