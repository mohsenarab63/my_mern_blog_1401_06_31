import React, { useState } from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { addPost } from '../../app/reducers/postsSlice'
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

      

        try{
            //const data = await API.post('/posts', new_post)
            const data = await api.createPost(new_post)
            navigate('/posts')
         }

        catch(error){
            
            console.log (error.response)  // For Development 
           
            if(error.response.status === 409) 
                  console.log ('Error message: ',error.response.data.message)  // For Development 
        }




      


        // dispatch(addPost(new_post))
        // navigate('/posts')

  }

  return (

    

    // <form style={{padding:"30px"}} onSubmit={handleSubmit}>
    //     <h3>AppPost</h3>
    //     <div className='div_row'> 
    //           <input type="text" name="" id="" className='el_control' 
    //                 onChange={(e)=>setFormData({...formData, title: e.target.value}) }  />
        
    //      </div>
    //     <div className='div_row'> 
    //         <textarea className='el_control txtarea' 
    //             onChange={(e)=>setFormData({...formData, body: e.target.value}) } ></textarea>
        
    //      </div>

    //      <div className='div_row'> 
    //         <input type="submit" value="Add Post" />
        
    //      </div>

    // </form>

    <Form className="my-3" onSubmit={(e)=>handleSubmit(e)}>
               <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title for the Note" ref={ titleRef }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control placeholder="Enter your notes" as="textarea" rows={3} ref={ textRef }/>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Notes Color</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={ colorRef }/>
                </Form.Group> */}
                <Button type="submit" variant="primary">Submit</Button>

       </Form>




    
  )
}

export default AppPost