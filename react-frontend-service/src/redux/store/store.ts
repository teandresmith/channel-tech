import { configureStore } from '@reduxjs/toolkit'
import { loginAPI } from '../services/loginAPI'
import { productAPI } from '../services/productAPI'
import { userAPI } from '../services/userAPI'
import { orderAPI } from '../services/orderAPI'
import productReducer from '../states/productState'
import cartReducer from '../states/cart'
import languageReducer from '../states/languageState'
import urlFiltersReducer from '../states/urlFilters'
import checkoutReducer from '../states/checkout'
import userReducer from '../states/user'

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    product: productReducer,
    cart: cartReducer,
    language: languageReducer,
    urlFilters: urlFiltersReducer,
    checkout: checkoutReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productAPI.middleware,
      userAPI.middleware,
      loginAPI.middleware,
      orderAPI.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
