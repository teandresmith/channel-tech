import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingInfo: {},
  paymentInfo: {},
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload.shippingInfo
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload.paymentInfo
    },
  },
})

export const { setShippingInfo, setPaymentInfo } = checkoutSlice.actions

export default checkoutSlice.reducer
