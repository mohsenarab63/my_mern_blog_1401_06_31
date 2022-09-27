import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsSlice'


export const store = configureStore({
    reducer :  {
        postsSection: postsReducer,
    }
})