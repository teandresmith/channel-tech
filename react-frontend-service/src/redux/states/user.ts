import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/Types'

const user =
  localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

const initialState: User = {
  user: user,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    logout: (state, action) => {
      state.user = null
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
