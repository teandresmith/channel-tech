import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  List,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Collapse,
  Badge,
  ListItemButton,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  ExpandMore,
  ExpandLess,
  Person,
  ShoppingCart,
  MenuRounded,
} from '@mui/icons-material'
import Contact from './Subcomponents/Contact'
import { useSelector } from 'react-redux'
import logo from '../../assets/images/websiteLogo.png'

const MobileNavbar = ({ handleUrlLanguageChange, handleLogout }) => {
  const cart = useSelector((state) => state.cart.value)
  const user = useSelector((state) => state.user.user)
  const language = useSelector((state) => state.language.language)
  const languageData = useSelector((state) => state.language.languageData)

  const [shopOpen, setShopOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [state, setState] = useState({
    right: false,
  })

  const [contactOpen, setContactOpen] = useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown') {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  let profileOpen = Boolean(profileAnchorEl)

  const handleProfileAnchor = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setProfileAnchorEl(null)
  }

  const checkShopCategories = (category) => {
    var categoryItems
    var lang = language

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
      <React.Fragment key={category}>
        <ListItemText primary={category} />
        <List>
          {categoryItems.map((item) => (
            <ListItemButton
              component={Link}
              to={`/shop?category=${category}&subcategory=${item}&lang=${lang}`}
              key={item}
              sx={{ pl: 4 }}
              onClick={toggleDrawer('right', false)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </React.Fragment>
    )
  }

  return (
    <>
      <AppBar color='inherit'>
        <Toolbar>
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', width: '100%' }}
          >
            <Box
              component={Link}
              to='/'
              variant='h5'
              sx={{
                textDecoration: 'none',
                maxHeight: { xs: 56 },
                maxWidth: 100,
              }}
            >
              <Box
                component='img'
                src={logo}
                sx={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </Box>
            <Box
              component='div'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {Object.keys(user).length !== 0 && (
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
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu>
                </>
              )}
              <IconButton
                component={Link}
                to='/cart'
                aria-label='cart'
                color='inherit'
                size='small'
              >
                <Badge badgeContent={cart.length} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                aria-label='menu'
                color='inherit'
                onClick={toggleDrawer('right', true)}
              >
                <MenuRounded />
              </IconButton>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                <Box
                  sx={{ width: { xs: '225px', sm: '350px' } }}
                  role='presentation'
                  onKeyDown={toggleDrawer('right', false)}
                >
                  <List>
                    <ListItemButton
                      key={language === 'en' ? 'Shop' : 'ショップ'}
                      onClick={() => setShopOpen(shopOpen ? false : true)}
                    >
                      <ListItemText
                        primary={language === 'en' ? 'Shop' : 'ショップ'}
                      />
                      {shopOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={shopOpen} timeout={'auto'} unmountOnExit>
                      <List component='div' sx={{ pl: 4 }}>
                        {languageData.Shop.Categories.map((category) =>
                          checkShopCategories(category)
                        )}
                      </List>
                    </Collapse>
                    <ListItemButton
                      key={language === 'en' ? 'Products' : '商品'}
                      onClick={() => setProductOpen(productOpen ? false : true)}
                    >
                      <ListItemText
                        primary={language === 'en' ? 'Products' : '商品'}
                      />
                      {productOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={productOpen} timeout={'auto'} unmountOnExit>
                      <List component='div' disablePadding>
                        {languageData.Shop.Products.map((product) => (
                          <ListItemButton
                            component={Link}
                            to={`/shop?category=${product}&lang=${language}`}
                            key={product}
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer('right', false)}
                          >
                            <ListItemText primary={product} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                    <ListItemButton onClick={() => handleUrlLanguageChange()}>
                      <ListItemText
                        primary={language === 'en' ? '日本語' : 'English'}
                      />
                    </ListItemButton>
                    <ListItemButton onClick={() => setContactOpen(true)}>
                      <ListItemText
                        primary={language === 'en' ? 'Contact' : 'コンタクト'}
                      />
                    </ListItemButton>
                    <Contact open={contactOpen} setOpen={setContactOpen} />
                    <ListItemButton
                      onClick={toggleDrawer('right', false)}
                      component={Link}
                      to='/about'
                    >
                      <ListItemText primary='About' />
                    </ListItemButton>
                    {Object.keys(user).length === 0 && (
                      <ListItemButton
                        onClick={toggleDrawer('right', false)}
                        component={Link}
                        to='/login'
                      >
                        <ListItemText
                          primary={language === 'en' ? 'Login' : 'ログイン'}
                        />
                      </ListItemButton>
                    )}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default MobileNavbar
