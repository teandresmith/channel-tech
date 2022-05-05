import { createSlice } from '@reduxjs/toolkit'

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  postalCode: string
  state: string
  country: string
}

interface InitialState {
  shippingInfo: ShippingInfo | null
  paymentInfo: { paymentId: string; orderId: string } | null
}

const initialState: InitialState = {
  shippingInfo: null,
  paymentInfo: null,
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
