import { configureStore } from '@reduxjs/toolkit'
import  buySlice  from './reducer'

export const store = configureStore({
  reducer: {
    buy: buySlice
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch