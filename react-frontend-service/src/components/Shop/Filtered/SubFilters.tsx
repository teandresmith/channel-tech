import React from 'react'
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
import { setPagination, setSubFilters } from '../../../redux/states/urlFilters'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

type SubFiltersProps = {
  category: string
  subCategory: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
}

const SubFilters = ({ category, subCategory, setSortBy }: SubFiltersProps) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const language = useAppSelector((state) => state.language.language)
  const languageData = useAppSelector((state) => state.language.languageData)
  const subFilters = useAppSelector((state) => state.urlFilters.subFilters)

  const dispatch = useAppDispatch()

  const loadData = (subFilter: string, data: Array<string>) => {
    let brands = new Map<string, boolean>()
    for (var items in data) {
      brands.set(`${subFilter}*${data[items]}`, false)
    }

    return brands
  }

  const priceData = new Map<string, boolean>([
    ['Prices*100', false],
    ['Prices*250', false],
    ['Prices*500', false],
    ['Prices*1000', false],
    ['Prices*1500', false],
    ['Prices*10000', false],
    ['Prices*25000', false],
    ['Prices*50000', false],
    ['Prices*100000', false],
    ['Prices*150000', false],
  ])

  const [priceFilter, setPriceFilter] = React.useState(priceData)
  const [brandFilter, setBrandFilter] = React.useState(
    loadData('Brands', languageData.Shop.Brands)
  )

  console.log(brandFilter)

  const handleCheckFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filterCopy = [...subFilters]

    if (e.target.checked) {
      if (e.target.name.includes('Prices')) {
        filterCopy = filterCopy.filter((item) => !item.includes('Prices'))

        const priceFilterCopy = new Map(priceFilter)
        priceFilterCopy.forEach((value: boolean, key: string) => {
          if (key !== e.target.name) {
            priceFilterCopy.set(key, false)
          } else {
            priceFilterCopy.set(key, true)
          }
        })

        setPriceFilter(new Map(priceFilterCopy))

        filterCopy.push(e.target.name)
      } else {
        const brandCopy = new Map(brandFilter)
        brandCopy.set(e.target.name, true)
        setBrandFilter(new Map(brandCopy))
        filterCopy.push(e.target.name)
      }
    } else if (e.target.name.includes('Prices') && !e.target.checked) {
      const priceFilterCopy = new Map(priceFilter)
      priceFilterCopy.set(e.target.name, false)
      setPriceFilter(new Map(priceFilterCopy))

      filterCopy = filterCopy.filter((item) => item !== e.target.name)
    } else {
      const brandCopy = new Map(brandFilter)
      brandCopy.set(e.target.name, false)
      setBrandFilter(new Map(brandCopy))
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

  React.useEffect(() => {
    if (subFilters.length !== 0) {
      let brands: Array<string> = []
      let price: Array<any> = []

      subFilters.map((filter) =>
        filter.includes('Brands') ? brands.push(filter) : price.push(filter)
      )

      if (brands.length !== 0) {
        const brandCopy = new Map(brandFilter)
        brandCopy.forEach((value: boolean, key: string) => {
          brands.map((brand) => {
            if (key === brand) {
              brandCopy.set(key, true)
              return null
            }
          })
        })

        setBrandFilter(new Map(brandCopy))
      }

      if (price.length !== 0) {
        const priceCopy = new Map(priceFilter)
        priceCopy.forEach((value: boolean, key: string) => {
          if (key === price[0]) {
            priceCopy.set(key, true)
          }
        })
        setPriceFilter(new Map(priceCopy))
      }

      if (subFilters.length === 0) {
        setBrandFilter(loadData('Brands', languageData.Shop.Brands))
        setPriceFilter(priceData)
      }
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
                        checked={brandFilter.get(`Brands*${brand}`)}
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
                        checked={priceFilter.get(`Prices*${price}`)}
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

type SubFiltersMobileProps = {
  priceFilter: Map<string, boolean>
  brandFilter: Map<string, boolean>
  handleCheckFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SubFiltersMobile = ({
  priceFilter,
  brandFilter,
  handleCheckFilter,
}: SubFiltersMobileProps) => {
  const languageData = useAppSelector((state) => state.language.languageData)
  const language = useAppSelector((state) => state.language.language)

  const [brandAnchorEl, setBrandAnchorEl] = React.useState(null)
  const brandOpen = Boolean(brandAnchorEl)

  const [priceAnchorEl, setPriceAnchorEl] = React.useState(null)
  const priceOpen = Boolean(priceAnchorEl)

  const handleBrandAnchor = (event: any) => {
    setBrandAnchorEl(event.currentTarget)
  }

  const handlePriceAnchor = (event: any) => {
    setPriceAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    if (brandAnchorEl !== null) {
      setBrandAnchorEl(null)
    } else if (priceAnchorEl !== null) {
      setPriceAnchorEl(null)
    }
  }

  const checkCategoryIteration = (category: string) => {
    var categoryItems: Array<number | string> = []
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
                    ? brandFilter.get(`Brands*${value}`)
                    : priceFilter.get(`Prices*${value}`)
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
