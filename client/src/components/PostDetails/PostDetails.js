import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as api from '../../api/index'
import {fetchAsyncSinglePost} from '../../app/reducers/postsSlice'

const PostDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const {post, isLoading} = useSelector(state=>state.postsSection.singlePost)
    console.log ('sinle posts:: ',post) 

    useEffect( () => {
            dispatch(fetchAsyncSinglePost(id)).unwrap()
            .then(result=>{
                console.log ('comment: ',result.comments) 
                setComments(result?.comments)
            })
        
    }, [])

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const handleChange = (e)=>{
        e.preventDefault()
        setComment(e.target.value)
    }

    const handleSubmitComment = async(e) =>{
       e.preventDefault()

       console.log ('comment: ',comment) 
       const result =  await api.commentPost(comment, post._id).then(result=>{
        setComments(result?.data?.comments)
        setComment('')
       })
       console.log ('data in handleSubmitComment: ',result) 

       ///:id/commentPost

    }

    
  
  return (
    <div style={{maxWidth:'700px', margin: ' 0 auto'}}>
       
       <div >
             <div> {post?.title} </div>
             <div> {post?.message} </div>
       </div>
       <div style={{height:'30px', backgroundColor:'#ccc', display: 'flex', justifyContent:'space-around', margin:'50px 0 10px 0'}}>
           
           <div style={{padding:'2px 5px ', border:'1px solid #999'}}
             onClick={()=>setShowCommentForm(!showCommentForm)}
           > add comment   </div>
           
       </div>
       <div>
          {showCommentForm && (
            <Form onSubmit={ (e)=>handleSubmitComment(e) }>
                <Form.Group className="mb-3" controlId="formMessage">
                    
                    <Form.Control name="message" placeholder="Enter your comment" as="textarea" rows={2} value={comment} onChange={handleChange} />
                </Form.Group>
                 <Button type="submit">submit </Button>
               
             </Form>

          )}  
       </div>
       <div>
          <h6> comments </h6>
          <div> 
             {comments.length> 0 &&  comments.map((comment,index)=>
               <div key={index}> {comment} </div>
             ) }
          </div>
       </div>
    </div>
  )
}

export default PostDetails
