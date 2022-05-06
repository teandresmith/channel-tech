import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  useTheme,
  useMediaQuery,
  ListItemText,
  Stack,
  Box,
} from '@mui/material'
import { ShoppingCart, Person } from '@mui/icons-material'
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom'
import MobileNavbar from './MobileNavbar'
import Contact from './Subcomponents/Contact'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { changeLanguage } from '../../redux/states/languageState'
import { setSubFilters } from '../../redux/states/urlFilters'
import { logout } from '../../redux/states/user'
import logo from '../../assets/images/websiteLogo.png'
import Cookies from 'js-cookie'

const Navbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null)
  let profileOpen = Boolean(profileAnchorEl)

  const handleProfileAnchor = (event: any) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const location = useLocation()
  let [searchParams] = useSearchParams()
  let category = searchParams.get('category')
  let subcategory = searchParams.get('subcategory')
  let subfilters = searchParams.get('subfilters')

  const navigate = useNavigate()

  const user = useAppSelector((state) => state.user.user)
  const cart = useAppSelector((state) => state.cart.value)
  const language = useAppSelector((state) => state.language.language)
  const languageData = useAppSelector((state) => state.language.languageData)
  const urlSubFilters = useAppSelector((state) => state.urlFilters.subFilters)
  const dispatch = useAppDispatch()

  const themes = useTheme()
  const matches = useMediaQuery(themes.breakpoints.down('md'))

  const [shopAnchorEl, setShopAnchorEl] = React.useState(null)
  const [productAnchorEl, setProductAnchorEl] = React.useState(null)
  const shopOpen = Boolean(shopAnchorEl)
  const productOpen = Boolean(productAnchorEl)

  const [contactOpen, setContactOpen] = React.useState(false)

  const handleShopAnchor = (event: any) => {
    setShopAnchorEl(event.currentTarget)
  }

  const handleProductAnchor = (event: any) => {
    setProductAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setShopAnchorEl(null)
    setProductAnchorEl(null)
    setProfileAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    Cookies.remove('Token')
    Cookies.remove('RefreshToken')

    dispatch(logout(''))
  }

  const checkShopCategories = (category: string) => {
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
      default:
        break
    }

    return (
      <List key={category}>
        <ListItemText primary={category} />
        <List>
          {categoryItems.map((item) => (
            <ListItemButton
              key={item}
              component={Link}
              to={`/shop?category=${category}&subcategory=${item}&lang=${language}`}
              onClick={handleClose}
            >
              <ListItemText secondary={item} />
            </ListItemButton>
          ))}
        </List>
      </List>
    )
  }

  const handleUrlLanguageChange = () => {
    if (location.pathname.includes('shop') && category) {
      let url = '/shop?'
      if (category) {
        let categoryInfo = 'category='

        switch (category) {
          case 'Computers':
          case 'パソコン':
            if (hasKey(languageData.Shop.DataMap.Computers, category)) {
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Computers[category]
              )
            }
            break
          case 'Phones':
          case '電話':
            if (hasKey(languageData.Shop.DataMap.Phones, category)) {
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Phones[category]
              )
            }

            break
          case 'Entertainment':
          case '電気機器':
            if (hasKey(languageData.Shop.DataMap.Entertainment, category))
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Entertainment[category]
              )
            break
          case 'Newest Products':
          case 'Top Rated Products':
          case 'Featured Products':
          case '一番商品':
          case 'おすすめ商品':
          case '新しい商品':
            if (hasKey(languageData.Shop.DataMap.Products, category)) {
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Products[category]
              )
            }

            break
          default:
            break
        }
        url = url.concat(categoryInfo)
      }

      if (subcategory) {
        let categoryInfo = '&subcategory='
        switch (category) {
          case 'Computers':
          case 'パソコン':
            if (hasKey(languageData.Shop.DataMap.Computers, subcategory))
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Computers[subcategory]
              )
            break
          case 'Phones':
          case '電話':
            if (hasKey(languageData.Shop.DataMap.Phones, subcategory))
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Phones[subcategory]
              )
            break
          case 'Entertainment':
          case '電気機器':
            if (hasKey(languageData.Shop.DataMap.Entertainment, subcategory))
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Entertainment[subcategory]
              )
            break
          case 'Newest Products':
          case 'Top Rated Products':
          case 'Featured Products':
          case '一番商品':
          case 'おすすめ商品':
          case '新しい商品':
            if (hasKey(languageData.Shop.DataMap.Products, subcategory))
              categoryInfo = categoryInfo.concat(
                languageData.Shop.DataMap.Products[subcategory]
              )
            break
          default:
            break
        }
        url = url.concat(categoryInfo)
      }

      if (subfilters) {
        let categoryInfo = '&subfilters='
        let splitFilters = subfilters.split(',')
        for (var i = 0; i < splitFilters.length; i++) {
          if (splitFilters[i].includes('Prices')) {
            let subFilterCopy = [...urlSubFilters]
            let price = splitFilters[i].split('*')[1]
            if (hasKey(languageData.Shop.DataMap.Prices, price))
              price = languageData.Shop.DataMap.Prices[price]
            splitFilters[i] = `Prices*${price}`
            subFilterCopy[i] = `Prices*${price}`
            dispatch(
              setSubFilters({
                subFilters: subFilterCopy,
              })
            )
          }
        }

        categoryInfo = categoryInfo.concat(splitFilters.join(','))
        url = url.concat(categoryInfo)
      }

      const lg = language === 'en' ? 'jp' : 'en'

      url = url.concat(`&lang=${lg}`)
      navigate(url)
    }
    dispatch(changeLanguage(language === 'en' ? 'jp' : 'en'))
  }

  function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
  }

  return (
    <>
      {matches ? (
        <MobileNavbar
          handleUrlLanguageChange={handleUrlLanguageChange}
          handleLogout={handleLogout}
        />
      ) : (
        <>
          <AppBar color='inherit'>
            <Toolbar>
              <Stack
                direction='row'
                sx={{ justifyContent: 'space-between', width: '100%' }}
              >
                <Box
                  component={Link as React.ElementType}
                  to='/'
                  variant='h5'
                  sx={{
                    textDecoration: 'none',
                    maxHeight: { md: 64 },
                  }}
                >
                  <Box
                    component='img'
                    src={logo}
                    sx={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </Box>
                <Stack direction='row'>
                  <Button onClick={(e) => handleShopAnchor(e)} color='inherit'>
                    {language === 'en' ? 'Shop' : 'ショップ'}
                  </Button>
                  <Menu
                    id='basic-menu'
                    anchorEl={shopAnchorEl}
                    open={shopOpen}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
                      {languageData.Shop.Categories.map((category) =>
                        checkShopCategories(category)
                      )}
                    </MenuItem>
                  </Menu>
                  <Button
                    onClick={(e) => handleProductAnchor(e)}
                    color='inherit'
                    sx={{ ml: 3 }}
                  >
                    {language === 'en' ? 'Products' : '商品'}
                  </Button>
                  <Menu
                    id='basic-menu'
                    anchorEl={productAnchorEl}
                    open={productOpen}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {languageData.Shop.Products.map((value, index) => (
                      <MenuItem
                        component={Link}
                        to={`/shop?category=${value}&lang=${language}`}
                        key={index}
                        onClick={handleClose}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Button
                    color='inherit'
                    sx={{ ml: 3 }}
                    onClick={() => setContactOpen(true)}
                  >
                    {language === 'en' ? 'Contact' : 'コンタクト'}
                  </Button>
                  <Contact open={contactOpen} setOpen={setContactOpen} />
                  <Button
                    component={Link}
                    to='/about'
                    color='inherit'
                    sx={{ ml: 3 }}
                  >
                    About
                  </Button>
                </Stack>
                <Stack direction='row' spacing={1}>
                  {language === 'en' ? (
                    <Tooltip title='Change to Japanese'>
                      <Button
                        color='inherit'
                        onClick={() => handleUrlLanguageChange()}
                      >
                        日本語
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title='Change to English'>
                      <Button
                        color='inherit'
                        onClick={() => handleUrlLanguageChange()}
                      >
                        English
                      </Button>
                    </Tooltip>
                  )}

                  {user !== null ? (
                    <>
                      <IconButton
                        onClick={handleProfileAnchor}
                        aria-label='person'
                        color='inherit'
                      >
                        <Person />
                      </IconButton>
                      <Menu
                        anchorEl={profileAnchorEl}
                        id='profile-menu'
                        open={profileOpen}
                        onClose={handleClose}
                        onClick={handleClose}
                      >
                        <MenuItem component={Link} to={`/user/${user.userId}`}>
                          {user.firstName}'s Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleLogout()}>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Button component={Link} to='/login' color='inherit'>
                      {language === 'en' ? 'Login' : 'ログイン'}
                    </Button>
                  )}

                  <IconButton
                    component={Link}
                    to='/cart'
                    aria-label='cart'
                    color='inherit'
                  >
                    <Badge
                      badgeContent={
                        cart.length === 0
                          ? 0
                          : Object.values(cart).reduce(
                              (previousValue, currentValue) =>
                                previousValue + currentValue.quantity,
                              0
                            )
                      }
                      color='secondary'
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  )
}

export default Navbar
