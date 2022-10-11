import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import postsInitial from  '../data.js'
import * as api from '../../api/index'
import { useDispatch } from "react-redux";


export const deleteAsyncPost = createAsyncThunk(
  'posts/deleteAsyncPost',
  async (id,{ rejectWithValue }) => {
          try{
            const results = await api.deletePost(id)
            console.log ('posts/deleteAsyncPost : results.data :',results.data) 
            return id
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)
export const createAsyncPost = createAsyncThunk(
  'posts/createAsyncPost',
  async (newPost,{ rejectWithValue }) => {
          try{
            const results = await api.createPost(newPost)
            console.log ('posts/createAsyncPost : results.data :',results.data) 
            return results.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)
export const fetchAsyncPost = createAsyncThunk(
  'posts/fetchAsyncPost',
  async ({page},{ rejectWithValue }) => {
          try{
            console.log ('page in fetchAsyncPost: ', page) 
            const result =await  api.fetchPost(page)
            
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
    cp:1
  }

  
  export const   postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers:{

        addPost: (state, action)=>{
              state.posts.push(action.payload)
        },
        setCurrentPage: (state, action)=>{
              state.cp =parseInt(action.payload) 
        },
        
          
    },
    
  extraReducers:{
       [createAsyncPost.pending]:()=>{
            console.log ('createAsyncPost pending..') 
       },
       [createAsyncPost.fulfilled]:(state, {payload})=>{
        //console.log ('state in createAsyncPost.fulfilled ',state) 
          state.posts.push(payload)
        // return {...state, posts: {...state.posts,payload}}
      
       },
       [fetchAsyncPost.pending]:()=>{
             console.log ('Fetch Posts: pending..') 
       },
       [fetchAsyncPost.fulfilled]:(state, {payload})=>{
           console.log ('fetch successfully, payload: ',payload) 
          //  return {...state, posts: payload}
         state.posts = payload
             
       },
       [fetchAsyncPost.rejected]:(state, {payload})=>{
             console.log('rejected !  payload:  ',payload)
            // return payload
       },
       [deleteAsyncPost.pending]:()=>{
             console.log ('delete a Post: pending..') 
       },
       [deleteAsyncPost.fulfilled]:(state, {payload})=>{
           console.log ('deleted successfully , id: ', payload) 
         //  return {...state, posts: payload}
         state.posts = state.posts.filter ( (post)=> post._id !== payload )
             
       },
       [deleteAsyncPost.rejected]:(state, {payload})=>{
             console.log('rejected !  payload:  ',payload)
            // return payload
       },
  }
  })

  export const {addPost, setCurrentPage} = postsSlice.actions
  export default postsSlice.reducer 
