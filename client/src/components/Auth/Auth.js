import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useNavigation } from 'react-router-dom'
import * as api from '../../api/index'
import {saveAuthToStorage, asyncSignin, asyncSignup} from '../../app/reducers/userSlice'


const Auth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({email:'', firstName:'',lastName:'', password:'',password_confirm:''})
  const [isSignUp, setIsSignUp] = useState(false)
  

  const handleSubmit= async(e)=>{
     try {
      e.preventDefault();
      console.log (formData) 
      if(isSignUp)   {

        //  const {data} = await api.signUp(formData)
        //  //dispatch()
        //  console.log ('data in await (signup) :: ',data)
        dispatch(asyncSignup(formData)) 
        navigate('/posts')

      }
      else  {
        // const data = await api.signIn(formData)
        // console.log ('data in await (signin): ',data) 
        dispatch(asyncSignin(formData))
        navigate('/posts') 
      }
      
     } catch (error) {
       console.log ('error in signIn [handleSubmit] ',error) 
       console.log ('error in signIn [handleSubmit] ',error.response.data) 
       console.log ('error in signIn [handleSubmit] ',error.response.status) 
     }
    

  }

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }

  return (
    <div style={{maxWidth:"500px",  margin:"30px auto"}}>
        
        <Form className="my-3" onSubmit={(e)=>handleSubmit(e)}>
               <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Email</Form.Label>
                    <Form.Control   name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
                </Form.Group>
                {
                  isSignUp && (
                    <>

                      <Form.Group className="mb-3" controlId="formFirstName">
                          <Form.Label>First name</Form.Label>
                          <Form.Control  name="firstName" type="text" placeholder="Enter First Name" onChange={handleChange} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formLastName">
                          <Form.Label>Last name</Form.Label>
                          <Form.Control  name="lastName" type="text" placeholder="Enter Last Name" onChange={handleChange} />
                      </Form.Group>
                    </>
                  )
                }
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control  name="password" type="password" placeholder="password" onChange={handleChange} />
                </Form.Group>
                {
                  isSignUp && (

                      <Form.Group className="mb-3" controlId="formConfirmPassword">
                          <Form.Label>confirm password</Form.Label>
                          <Form.Control  name="password_confirm" type="password" placeholder="confrim password" onChange={handleChange} />
                      </Form.Group>
                  )
                }
                
                <Button type="submit" variant="primary">{ isSignUp ? 'SignUp' : 'Login' }</Button>
                <div> 
                {isSignUp ? <>
                  You have already an account ?    <span onClick={()=>setIsSignUp(!isSignUp)}> <b> Login </b>  </span>
                  </> : (
                    <>
                       Do not have an account ?    <span onClick={()=>setIsSignUp(!isSignUp)}> <b>  Register </b> </span>

                    </>
                  )
                  
                   } 
                  
                 </div>

       </Form>


        
    </div>
  )
}

export default Auth    