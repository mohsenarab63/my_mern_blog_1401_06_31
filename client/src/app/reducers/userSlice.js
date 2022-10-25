import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import postsInitial from  '../data.js'
import * as api from '../../api/index'

// export const signin00 = async (formData, navigate)  => {
//     try {
//       const { data } = await api.signIn(formData);
//       //console.log (data, 'signin in action/auth.js') 
  
       
  
//       //navigate('/');
//     } catch (error) {
//       console.log(error.message, error.code);
//        throw new  Error(error.message);
//     }
//   };

  export const asyncSignin = createAsyncThunk('user/signin',
     async ( formData,{rejectWithValue})=> {

        try {
            const { data } = await api.signIn(formData);
            console.log (data, 'signin in createAsyncThunk') 
        
             return data
        
            //navigate('/');
          } catch(error){
            return rejectWithValue(error.response.data)
          }
           
           
     }
  )
  export const asyncSignup = createAsyncThunk('user/signup',
     async ( formData,{rejectWithValue})=> {

        try {
            const { data } = await api.signUp(formData);
            console.log (data, 'signup in createAsyncThunk') 
        
             return data
        
            //navigate('/');
          } catch(error){
            return rejectWithValue(error.response.data)
          }
           
           
     }
  )



  const initialState = {
    authData: {},
    error:''
  } 

  export  const userSlice = createSlice({
      name:'userSlice',
      initialState,
      reducers:{
        auth(state,action){
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            state.authData = action.payload
        },
        logoutAction(state,action){
            localStorage.clear()
            state.authData = {}
            console.log ('Logout::: state.authData: ',state.authData) 
        },
        saveAuthToStorage(state,action) {
                
                // localStorage.setItem('profile',JSON.stringify(action.payload))
                // state.authData=action.payload

          }
      },
      extraReducers:{
        [asyncSignin.pending]: (state,action)=>{
            console.log ('pending asyncSignin') 
            state.error = ''
        },
        [asyncSignin.fulfilled]:(state,action)=>{
            console.log (' asyncSignin fullfilled') 
            localStorage.setItem('profile',JSON.stringify(action.payload))
            state.authData=action.payload
        },
        [asyncSignin.rejected]:(state,action)=>{
            console.log (' asyncSignin rejected :',action.payload) 
            const {code}=action.payload
            if(code==='no_user' || code==='invalid_credentials')
                state.error = "invalid email and/or password"
               
        },
        [asyncSignup.pending]: (state,action)=>{
            console.log ('pending asyncSignup') 
            state.error = ''
        },
        [asyncSignup.fulfilled]:(state,action)=>{
            console.log (' asyncSignup fullfilled') 
            localStorage.setItem('profile',JSON.stringify(action.payload))
            state.authData=action.payload
        },
        [asyncSignup.rejected]:(state,action)=>{
            console.log (' asyncSignup rejected') 
        },
      }
  })

  export const {saveAuthToStorage, auth,logoutAction} = userSlice.actions

  export default userSlice.reducer
