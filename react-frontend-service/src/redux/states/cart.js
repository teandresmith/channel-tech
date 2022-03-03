import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:
    localStorage.getItem('cart') === null
      ? []
      : JSON.parse(localStorage.getItem('cart')),
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addItem = action.payload.info
      const cart = action.payload.cart
      const itemExists = cart.find(
        (item) => item.product.name === addItem.product.name
      )

      if (itemExists) {
        state.value = cart.map((item) =>
          item.product.name === addItem.product.name ? addItem : item
        )
      } else {
        state.value = [...state.value, addItem]
      }

      localStorage.setItem('cart', JSON.stringify(state.value))
    },
    deleteFromCart: (state, action) => {
      const deleteItem = action.payload.info
      const cart = action.payload.cart
      state.value = cart.filter(
        (item) => item.product.name !== deleteItem.product.name
      )
      localStorage.setItem('cart', JSON.stringify(state.value))
    },
    clearCart: (state, action) => {
      state.value = []
      localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
