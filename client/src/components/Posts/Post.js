import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {deleteAsyncPost,likePostAction} from '../../app/reducers/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Card, Container} from 'react-bootstrap'
import {CommentIcon, AddCommentIcon} from '../../icons/index'



import './posts.css'
import './style.css'
import { Button } from 'react-bootstrap'


const Post = ({post}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile'))) 
    const [likes, setLikes] = useState(post?.likes)
    const cp = useSelector(state=>state.postsSection.cp)
    const userAuth = useSelector(state=>state.userSection.authData)

    const userId = user?.result?._id 
    const hasLiked = likes.find( like => like === userId )
    const postId = post._id ;

    //console.log ('userId',userId) 
    //console.log ('userId',userId) 

    useEffect(() => {
    
      setUser( JSON.parse(localStorage.getItem('profile')) );
      console.log ('userAuth [userAuth] in useEffect [Navbar] : ',userAuth) 
      
    }, [userAuth])

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

    const handleDeletePost = (postId)=>{
      dispatch(deleteAsyncPost(postId)).unwrap()
      .then(result=>{
         
        navigate(`/posts`)
        console.log ('delete in then()') 
      }).catch(error=>{
        console.log ('error in delete post :',error) 
      })
    }

    const openPost = (id)=> {
        navigate(`/post/${id}`)
       }

       function HasLikedIcon(){
          return (
           
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
"><path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"></path></svg>

          )
       }
       function LikeIcon(){
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
          </svg>

          )
       }
      
  return (

    <Card style={{posirion:'relative'}}>
        <Card.Img src={post.selectedFile} variant="top" height="150px"
          style={{objectFit:'cover'}}
        />
        <Card.Body className='' >
              <Card.Title className='d-flex flex-column  align-items-center' >
               {post?.title}
               
                
              </Card.Title>
              <Card.Text >
                 <div className='ms-2 text-muted' onClick={()=>openPost(post._id)} style={{height:'50px', cursor:'pointer'}}>
                    {post?.message}
                 </div>
                
                  <div style={{height:'30px'}}>
                  {
                      post.tags.length > 0  && (
                        <div className='tags_container' >
                          {post.tags.map( (tag,index)=> (
                                <div className='tag' key={index} style={{display:'flex'}}>
                                    <span>#</span> {tag}
                                </div>
                          ) )}
                        </div>
                      )
                  }
                  </div>


                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',background: '#f6f6f6'}}>
                            {/* <button className={`btn ${hasLiked ? 'btn-primary' :'btn-secondary' }  btn-xs`} onClick={handleLike}>like</button> */}

                            <span  style={{display:'flex', alignItems:'center'}} >
                              <span style={{ fontSize:'25px',cursor:'pointer',display:'flex', alignItems:'center', marginRight:'5px'}} onClick={handleLike}>{ hasLiked ?  <HasLikedIcon /> : <LikeIcon />} </span>    <span className='text-muted'>{likes.length}</span>
                            </span> 


                            <span style={{display:'flex', alignItems:'center'}}>
                                  <span style={{marginRight:'5px'}}>
                                     <CommentIcon /> 
                                  </span>   
                                  <span className='text-muted' style={{fontSize:"14px"}}>  {post.comments.length} </span> 
                            </span>   
                         
                 </div>


                 {userId && userId=== post.creator   && (
                              <Button  onClick={()=>handleDeletePost(post._id)} variant='outline-danger' size="sm"  className='delete_post_btn' style={{position:'absolute',right:'1px',top:'1px'}}>
                             
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                               
                                </Button>
                ) } 
                 
               
            </Card.Text>

        </Card.Body>
    </Card>

    
  //   <div className='post_item'   
  //   style={ {border:"1px solid #ccc", margin: "20px", padding:"5px", minWidth: "300px"} }>
  //       <h6> <b>{post.name || ''}</b>  {post.title} </h6>
  //       <div style={{cursor:'pointer',height:'80px'}} onClick={()=>openPost(post._id)}>
  //           {post.message }
  //       </div>
  //       <div>
  //           {post.selectedFile && (
  //              <img src={post.selectedFile} width="100" height="100" alt="" />
  //           ) }
  //       </div>
  //       {
  //         post.tags.length > 0  && (
  //           <div className='tags_container' >
  //              {post.tags.map( (tag,index)=> (
  //                   <div className='tag' key={index}>
  //                       <span>#</span> {tag}
  //                   </div>
  //              ) )}
  //           </div>
  //         )
  //       }
  //       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
  //            {/* <button className={`btn ${hasLiked ? 'btn-primary' :'btn-secondary' }  btn-xs`} onClick={handleLike}>like</button> */}

  //            <span  >
  //             <span style={{ fontSize:'25px',cursor:'pointer'}} onClick={handleLike}>{ hasLiked ?  <HasLikedIcon /> : <LikeIcon />} </span>    <span className='text-muted'>{likes.length}</span>
  //            </span>  

              

  //            {userId && userId=== post.creator   && (<button  onClick={()=>dispatch(deleteAsyncPost(post._id))}  className='delete_post_btn'> &times; </button>) } 
  //       </div>
  // </div>

  )
}

export default Post