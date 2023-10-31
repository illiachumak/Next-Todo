import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import authSlice from './Slices/authSlice'
import regSlice from './Slices/regSlice'
import contentSlice from './Slices/contentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    reg: regSlice,
    cont: contentSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
