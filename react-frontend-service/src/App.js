import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Home,
  About,
  Shop,
  ProductDetails,
  Login,
  Register,
  Navbar,
  Cart,
  Checkout,
  UserProfile,
  PageNotFound,
} from './components'
import ScrollToTop from './components/ScrollToTop'
import { useGetAllProductsMutation } from './redux/services/productAPI'
import Loading from './components/Loading'
import { useSelector } from 'react-redux'

const App = () => {
  const language = useSelector((state) => state.language.language)
  const [getAllProducts, { data, isLoading, isUninitialized }] =
    useGetAllProductsMutation()

  console.log(data)

  useEffect(() => {
    getAllProducts(language)
  }, [language])

  return (
    <>
      <CssBaseline />

      {isUninitialized || isLoading ? (
        <Loading open={isLoading} />
      ) : (
        <>
          <Router>
            <ScrollToTop>
              <Navbar />
              <div style={{ marginTop: '100px' }}>
                <Routes>
                  <Route path='/' element={<Home data={data.result} />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/shop' element={<Shop data={data.result} />} />
                  <Route
                    path='/products/:productid'
                    element={<ProductDetails />}
                  />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/user/:userid' element={<UserProfile />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/*' element={<PageNotFound />} />
                </Routes>
              </div>
            </ScrollToTop>
          </Router>
        </>
      )}
    </>
  )
}

export default App
