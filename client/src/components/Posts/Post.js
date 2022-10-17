import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {deleteAsyncPost,likePostAction} from '../../app/reducers/postsSlice'
import { useDispatch } from 'react-redux'


import './posts.css'
import './style.css'
import { Button } from 'react-bootstrap'


const Post = ({post}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [likes, setLikes] = useState(post?.likes)

    const userId = user?.result?._id 
    const hasLiked = likes.find( like => like === userId )
    const postId = post._id ;

    const handleLike=()=>{
        console.log ('handleLike ',postId) 
        dispatch(likePostAction(postId)).unwrap()
        .then(result=>{
             
            console.log ('result in like action: ',result)
            if(result.ok)
              setLikes(result.updatedPost.likes)
            //user.likes = 
        }).catch(error=>{
            console.log ('catch error in like action: ',error) 
        })
    }

    const openPost = (id)=> {
        navigate(`/post/${id}`)
       }
      
  return (
    
    <div className='post_item'   
    style={ {border:"1px solid #ccc", margin: "20px", padding:"5px", minWidth: "300px"} }>
        <h6> <b>{post.name || ''}</b>  {post.title} </h6>
        <div style={{cursor:'pointer',height:'80px'}} onClick={()=>openPost(post._id)}>
            {post.message }
        </div>
        <div>
            {post.selectedFile && (
               <img src={post.selectedFile} width="100" height="100" alt="" />
            ) }
        </div>
        {
          post.tags.length > 0  && (
            <div className='tags_container' >
               {post.tags.map( (tag,index)=> (
                    <div className='tag' key={index}>
                        <span>#</span> {tag}
                    </div>
               ) )}
            </div>
          )
        }
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
             <button className={`btn ${hasLiked ? 'btn-primary' :'btn-secondary' }  btn-xs`} onClick={handleLike}>like</button>

             <button  onClick={()=>dispatch(deleteAsyncPost(post._id))}  className='delete_post_btn'> delete </button>
        </div>
  </div>

  )
}

export default Post