import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, createAsyncPost } from '../../app/reducers/postsSlice'
import { useNavigate } from 'react-router-dom'
import {  Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'
import * as api from '../../api/index'
import './addPost.css'
import FileBase from 'react-file-base64'




const AppPost = () => {

  const [formData, setFormData] = useState({title:'',message:''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState({title:'',message:''})
  const [error, setError] = useState(false)
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState(['PHP','JS'])

  console.log ('AddPost Component is loading ..') 

  const close_tag= (tag) => {
   
     console.log (tag) 
      setTags([...tags.filter((item)=> item !== tag ) ]) 
  }

  const handleChange = (e) => {
      
      setFormData({...formData, [e.target.name]:e.target.value})
    
  }

  const handleTagAdd=(e)=>{
         e.preventDefault();

          console.log ('Click, tag is: ',tag) 
          setTags(tags=>[...tags, tag])
          //console.log ('tags::',tags) 
          setTag('')
  }

  const handleKeyDown = (e)=>{
     // console.log ('handleKeyDown, value',e.target.value) 
     ///e.preventDefault();
     if(e.code === 'Enter'){
        e.preventDefault();
        setTags(tags=>[...tags, tag])
        setTag('')
        return false;
     }

    // return false;
  }

  useEffect(()=>{
    
  },[errorMessage])

   

  const titleRef = React.useRef(null);
  const textRef = React.useRef(null);

  //const API = axios.create({baseURL:'http://localhost:5000'})
  const validation = {
     title: { 
        minLength:
              {size:6, message: 'title   must be at least 6 caracters'} 
      },
     message: {
        minLength:
        {size:10, message: 'message   must be at least 10 caracters'}
    }
  }

  const handleSubmit =  async (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage([])
        var error_exist = false

        console.log ('formData: ',formData) 

        var errMsg = [];
        
        //    const new_post = {
        //         title: titleRef.current.value,
        //         message: textRef.current.value
        // }

        Object.keys(formData).forEach( key =>{
            if(formData[key] ==='title' || formData[key] ==='mesage' )
             if(formData[key].trim().length <validation[key].minLength.size){             
                 errMsg.push(validation[key].minLength.message)           
                 error_exist = true
             }
             
          })

          setErrorMessage(errMsg)     
          if(error_exist) {
            console.log (' Error') 
            return ;
          } 
          console.log ('No Error') 

        const user= JSON.parse(localStorage.getItem('profile'))

        try{
            console.log ('user',user) 
            console.log ('user.name',user?.result?.name) 
            dispatch(createAsyncPost({...formData,name:user?.result?.name, tags, userId:user?.result?._id }))
            .unwrap()
            .then( results => {
                console.log ('createAsyncPost in then(): ',results) 
                console.log ('dispatch(fetchAsyncPost())') 
               /// dispatch(addPost(results))
               navigate('/posts')
              
                
            } )
            .catch( (rejectedValueOrSerializedError) => {
            // handle error here
               const {code} = rejectedValueOrSerializedError
            console.log ('Fetch with Error in UseEffect in Posts') 
            console.log (rejectedValueOrSerializedError)
              if(code==='login'){
                console.log ('Please Login to create Post')
                 navigate('/auth')
              } 

            })

            
           
         
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
                    <Form.Control name="title" type="text" placeholder="Enter Title for the Note" ref={ titleRef } onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText2">
                    <Form.Label>Text</Form.Label>
                    <Form.Control name="message" placeholder="Enter your notes" as="textarea" rows={2} ref={ textRef } onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="showError">
                    {errorMessage.length>0 && <div className="alert alert-danger">
                        <ul>
                            {  
                                errorMessage.map((error,index)=> 
                                    <li key={index}> {error} </li>
                                
                                )
                           }
                      </ul>
                     
                      </div>
                    }
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="addTags">
                       <div>
                        <Form.Control name="tag" type="text" placeholder="Enter Tag "   value={tag}  onChange={(e)=>setTag(e.target.value)} onKeyDown={handleKeyDown}   />
                        <Button onClick={handleTagAdd}> Add Tag </Button>

                       </div>
                       <div className='tags_container'> 
                      { tags.length > 0 && <div>Tags: </div>  }   {
                             
                              tags.map((tag,index)=>(
                                  
                                    
                                   <div className='tag_item' key={index}  > 
                                        <div className='close_tag' onClick={()=>close_tag(tag)  }>X</div>
                                        <div className='tag_content' >  {tag} </div> 
                                    </div>

                              ))
                             }
                            
                       </div>
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="addPic">
                        
                       <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
                 </Form.Group>


                 
               
                <Button type="submit" disabled={!formData.title || !formData.message} variant="primary">Submit</Button>

       </Form>

    
  )
}

export default AppPost