import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {fetchAsyncPost,deleteAsyncPost,setCurrentPage,setIsLoadingPosts} from '../../app/reducers/postsSlice'
import './posts.css'
import MyPagination from './Pagination'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Post from './Post'
import {Col, Row,Container} from 'react-bootstrap'

function useQuery(){
   return new URLSearchParams(useLocation().search)
}

const Posts = () => {
  
  //const [posts, setPosts] = useState([])

   const dispatch = useDispatch()
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1
  
  console.log ('posts Component Loads ..') 
   
  const cp = page
  let posts = useSelector(state=>state.postsSection.posts.content)
  let {isLoading} = useSelector(state=>state.postsSection.posts)
  let np = useSelector(state=>state.postsSection.np)
  const del = useSelector(state=>state.postsSection.del)
  
  useEffect(() => {
     dispatch(setIsLoadingPosts(true))
     dispatch(fetchAsyncPost({page})).unwrap().then( result=>{ dispatch(setIsLoadingPosts(false))  } )
     .catch(error=>{
       console.log (error) 
       setIsLoadingPosts(false)
     })
     
  }, [page,dispatch,np,del])
  
  
  //  const openPost = (id)=> {
  //   navigate(`/post/${id}`)
  //  }
   
  if(isLoading) return <div className="mt-5"> Loading ... </div>

  return (
    <Container>
    <h1>Store</h1>
    <Row md={2} xs={1} lg={4} className="g-3">
      {
        posts.map(post=>(
          <Col key={post._id}> 
             <Post post={post}  />
          </Col>
      ))
      }
    </Row>

    <MyPagination cp={cp} np={np} />

  </Container>
       
  )
    }

export default Posts
