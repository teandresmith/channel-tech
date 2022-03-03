import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    logout: (state, action) => {
      state.user = {}
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
