import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import postsInitial from  '../data.js'
import * as api from '../../api/index'
import { useDispatch } from "react-redux";


export const deleteAsyncPost = createAsyncThunk(
  'posts/deleteAsyncPost',
  async (id,{ rejectWithValue }) => {
          try{
            const results = await api.deletePost(id)
            //console.log ('posts/deleteAsyncPost : results.data :',results.data) 
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
            //console.log ('posts/createAsyncPost : results.data :',results.data) 
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
            
           // console.log ('data in fetchAsyncPost: ',result.data) 
            
            return result.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)
export const fetchAsyncSinglePost = createAsyncThunk(
  'posts/fetchAsyncSinglePost',
  async (id,{ rejectWithValue }) => {
          try{
            
            const result =await  api.fetchSinglePost(id)
            return result.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)

export const likePostAction = createAsyncThunk(
  'posts/likePostAction',
  async (postId,{ rejectWithValue }) => {
          try{
            
            const result =await  api.likePostAction(postId)
            return result.data
          }
          catch(error){
            return rejectWithValue(error.response.data)
          }
  }
)

export const addComment = createAsyncThunk('posts/addComment',async ({comment, id} ,{rejectWithValue})=>{
        try {

          const result =  await api.commentPost(comment, id)
          return result.data

        }
        catch(error){
          return rejectWithValue(error.response.data)
        }
} )

//const {data} = await api.fetchSinglePost(postId)


const initialState = {
    posts: {content:[], isLoading:false},
    singlePost:{post:{},isLoading:false},
    cp:1,
    np:1
  }

  
  export const   postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers:{

        addPost: (state, action)=>{
              state.posts.content.push(action.payload)
        },
        setIsLoadingPosts: (state, action)=>{
              state.posts.isLoading = action.payload
        },
        setCurrentPage: (state, action)=>{
              state.cp =parseInt(action.payload) 
        },
        setNumberOfPage: (state, action)=>{
              state.np =parseInt(action.payload) 
        },
        NextPage: (state, action)=>{
          state.cp = state.cp +1 
        },
        PrevPage: (state, action)=>{
              state.cp = state.cp-1 
        },
        
          
    },
    
  extraReducers:{
       [createAsyncPost.pending]:()=>{
            console.log ('createAsyncPost pending..') 
            
       },
       [createAsyncPost.fulfilled]:(state, {payload})=>{
        console.log ('state in createAsyncPost.fulfilled, payload: ',payload) 
          state.posts.content.push(payload)
        // return {...state, posts: {...state.posts,payload}}
        state.posts.isLoading= false;
      
       },
       [createAsyncPost.rejected]:(state, {payload})=>{
        //console.log ('state in createAsyncPost.fulfilled ',state) 

           console.log('createAsyncPost rejected: ',payload)
           if(payload.code === 'login'){
              
           }
           state.posts.isLoading= false;
        // return {...state, posts: {...state.posts,payload}}
      
       },
       [likePostAction.pending]:()=>{
            console.log ('likePostAction pending..') 
       },
       [likePostAction.fulfilled]:(state, {payload})=>{
        //console.log ('state in likePostAction.fulfilled ',state) 
         
          console.log('likePostAction fulfilled: ',payload)
       },
       [likePostAction.rejected]:(state, {payload})=>{
        
           console.log('likePostAction rejected: ',payload)
           
        
      
       },
       [addComment.pending]:()=>{
            console.log ('addComment pending..') 
       },
       [addComment.fulfilled]:(state, {payload})=>{
        //console.log ('state in addComment.fulfilled ',state) 
         
          console.log('addComment fulfilled: ',payload)
       },
       [addComment.rejected]:(state, {payload})=>{
        
           console.log('addComment rejected: ',payload)
           
        
      
       },
       [fetchAsyncPost.pending]:()=>{
             console.log ('Fetch Posts: pending..') 
       },
       [fetchAsyncPost.fulfilled]:(state, {payload})=>{
           console.log ('fetch posts successfully, payload: ',payload) 
          //  return {...state, posts: payload}
          const {posts,numberOfPages}= payload
          state.np = numberOfPages
         state.posts.content = posts
             
       },
       [fetchAsyncPost.rejected]:(state, {payload})=>{
             console.log('fetch posts rejected !  payload:  ',payload)
            // return payload
       },
       [fetchAsyncSinglePost.pending]:()=>{
             console.log ('Fetch fetchAsyncSinglePost: pending..') 
       },
       [fetchAsyncSinglePost.fulfilled]:(state, {payload})=>{
          // console.log ('fetch fetchAsyncSinglePost successfully, payload: ',payload) 
          //  return {...state, posts: payload}
         state.singlePost.post = payload
             
       },
       [fetchAsyncSinglePost.rejected]:(state, {payload})=>{
             console.log('rejected !  payload:  ',payload)
            // return payload
       },
       [deleteAsyncPost.pending]:()=>{
             console.log ('delete a Post: pending..') 
       },
       [deleteAsyncPost.fulfilled]:(state, {payload})=>{
           console.log ('deleted successfully , id: ', payload) 
         //  return {...state, posts: payload}
         state.posts.content = state.posts.content.filter ( (post)=> post._id !== payload )
             
       },
       [deleteAsyncPost.rejected]:(state, {payload})=>{
             console.log('rejected !  payload:  ',payload)
            // return payload
       },
  }
  })

  export const {addPost, setCurrentPage,setNumberOfPage,NextPage, PrevPage, setIsLoadingPosts} = postsSlice.actions
  export default postsSlice.reducer 
