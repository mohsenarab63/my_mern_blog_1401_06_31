import React, { useEffect, useState } from 'react'
import { Button,Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as api from '../../api/index'
import {fetchAsyncSinglePost,addComment} from '../../app/reducers/postsSlice'
import {CommentIcon, AddCommentIcon} from '../../icons/index'

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
                console.log ('comment in useEffect: ',result.comments) 
                setComments(result?.comments)
            })
        
    }, [])

   //  function CommentIcon(){
   //    return (
   //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
   //       <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
   //     </svg>
   //    )
   //  }

   //  function AddCommentIcon(){
   //    return (
   //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
   //          <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
   //    </svg>
   //    )
   //  }

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const handleChange = (e)=>{
        e.preventDefault()
       
        setComment(e.target.value)
    }

    const handleSubmitComment = async(e) =>{
       e.preventDefault()

      //// console.log ('comment: ',comment) 
      const newComment = (user?.result?.name || '')+':'+comment;
      console.log (newComment) 
       dispatch(addComment({comment:newComment,id:post._id})).unwrap()
       .then(result=>{
          setComments(result?.comments)
          console.log ('data in dispatch(addComment(..)): ',result) 
          setComment('')
         }).catch(error=>{
           console.log ('Error: ',error) 
         })

      
      //  const result =  await api.commentPost(comment, post._id).then(result=>{
      //   setComments(result?.data?.comments)
      //   setComment('')
      //  })
      // console.log ('data in handleSubmitComment: ',result) 

       ///:id/commentPost

    }

    
  
  return (
    <div style={{maxWidth:'700px', margin: ' 100px auto'}}>

       <Card>
            <Card.Img src={post.selectedFile} variant="top" height="300px"
               style={{objectFit:'cover'}}
            />
            <Card.Body className=''>
                  <Card.Title className='d-flex flex-column  align-items-center'>
                     <h6 className='fs-2'>{post?.title}</h6>
                     <div className='ms-2 text-muted'>{post?.message}</div>
                  </Card.Title>
            </Card.Body>
         </Card>
       
        
       <div style={{height:'30px', backgroundColor:'#ccc', display: 'flex', justifyContent:'space-between', margin:'50px 0 10px 0'}}>
           
           <div style={{padding:'2px 5px ', margin:'2px 10px  '}}
             
           > 
           <CommentIcon /> <span className='text-muted' style={{fontSize:"14px"}}>{comments.length}</span>     </div>

           <div onClick={()=>setShowCommentForm(!showCommentForm)} style={{padding:'2px 5px ', cursor:'pointer', margin:'2px 10px  '}} >
              <AddCommentIcon  />
           </div>
           
       </div>
       <div className='mb-3'>
          {showCommentForm && (
            <Form onSubmit={ (e)=>handleSubmitComment(e) }>
                <Form.Group className="mb-3" controlId="formMessage">
                    
                    <Form.Control name="message" placeholder="Enter your comment" as="textarea" rows={2} value={comment} onChange={handleChange} />
                </Form.Group>
                 <Button type="submit" disabled={!comment.trim().length}>submit </Button>
               
             </Form>

          )}  
       </div>
       <div>
          <h6 className='text-muted'> comments  </h6>
          <div className='pl-3'> 
             {comments.length> 0 &&  comments.map((comment,index)=>
               <div key={index}>
               <strong>{  comment && comment.split(':').length > 0 ? (comment.split(':')[0] +': ') : ''  }</strong>
               { comment && comment.split(':').length > 0 ? (comment.split(':')[1]) : comment  }
                
                </div>
             ) }
          </div>
       </div>
    </div>
  )
}

export default PostDetails
