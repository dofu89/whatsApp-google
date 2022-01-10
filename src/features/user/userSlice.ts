import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'

const initialState = {
  user: null,
  messages: [],
  seed: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages
    },
    setSeed: (state, action) => {
      state.seed = action.payload.seed
    },
  },
})

export const { setUser, setMessages, setSeed } = userSlice.actions

export const authUser = (state: RootState) => state.user.user
export const messagesRoom = (state: RootState) => state.user.messages
export const seedId = (state: RootState) => state.user.seed

export default userSlice.reducer
