import React, { useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, createAsyncPost } from '../../app/reducers/postsSlice'
import { useNavigate } from 'react-router-dom'
import {  Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'
import * as api from '../../api/index'



const AppPost = () => {

  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

   

  const titleRef = React.useRef(null);
  const textRef = React.useRef(null);

  //const API = axios.create({baseURL:'http://localhost:5000'})

  const handleSubmit =  async (e) => {
        e.preventDefault();
           const new_post = {
                title: titleRef.current.value,
                message: textRef.current.value
        }

        const user= JSON.parse(localStorage.getItem('profile'))

        try{
            console.log ('user',user) 
            console.log ('user.name',user?.result?.name) 
            dispatch(createAsyncPost({...new_post,name:user?.result?.name}))
            .unwrap()
            .then( results => {
                console.log ('createAsyncPost in then(): ',results) 
                console.log ('dispatch(fetchAsyncPost())') 
               /// dispatch(addPost(results))
                
            } )
            .catch( (rejectedValueOrSerializedError) => {
            // handle error here
            console.log ('Fetch with Error in UseEffect in Posts') 
            console.log (rejectedValueOrSerializedError) 
            })
            navigate('/posts')
         
         }

        catch(error){
            
            console.log (error.response)  // For Development 
          
            if(error.response.status === 409) 
                  console.log ('Error message: ',error.response.data.message)  // For Development 
        }

  }

  return (

    <Form className="my-1" onSubmit={(e)=>handleSubmit(e)} style={{maxWidth:"700px", margin:"0 auto"}}>
               <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title for the Note" ref={ titleRef }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control placeholder="Enter your notes" as="textarea" rows={2} ref={ textRef }/>
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>

       </Form>

    
  )
}

export default AppPost