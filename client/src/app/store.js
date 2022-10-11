import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsSlice'
import userReducer from './reducers/userSlice'


export const store = configureStore({
    reducer :  {
        postsSection: postsReducer,
        userSection: userReducer
    }
})