import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import postsInitial from  '../data.js'
import * as api from '../../api/index'


export const createAsyncPost = createAsyncThunk(
  'posts/createAsyncPost',
  async (newPost,{ rejectWithValue }) => {
          try{
            const results = await api.createPost(newPost)
            return results.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)
export const fetchAsyncPost = createAsyncThunk(
  'posts/fetchAsyncPost',
  async (newPost,{ rejectWithValue }) => {
          try{
            const result =await  api.fetchPost()
            console.log ('data in fetchAsyncPost: ',result.data) 
            return result.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)


const initialState = {
    posts: [],
  }

  
  export const   postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers:{

        addPost: (state, action)=>{
              state.posts.push(action.payload)
        }
          
    },
    
  extraReducers:{
       [createAsyncPost.pending]:()=>{
            console.log ('pending..') 
       },
       [createAsyncPost.fulfilled]:(state, {payload})=>{
             
       },
       [fetchAsyncPost.pending]:()=>{
             console.log ('Fetch Posts: pending..') 
       },
       [fetchAsyncPost.fulfilled]:(state, {payload})=>{
           console.log ('fetch successfully') 
           return {...state, posts: payload}
             
       },
       [fetchAsyncPost.rejected]:(state, {payload})=>{
             console.log('rejected !  payload:  ',payload)
             return payload
       },
  }
  })

  export const {addPost} = postsSlice.actions
  export default postsSlice.reducer 
