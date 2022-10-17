import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {fetchAsyncPost,deleteAsyncPost,setCurrentPage} from '../../app/reducers/postsSlice'
import './posts.css'
import MyPagination from './Pagination'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Post from './Post'

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
  let posts = useSelector(state=>state.postsSection.posts)
  
  useEffect(() => {
     dispatch(fetchAsyncPost({page}))
     
  }, [page,dispatch])
  
  
  //  const openPost = (id)=> {
  //   navigate(`/post/${id}`)
  //  }
  

  return (
      <div>

          <div    className='post_container'>
              {posts.length ? posts.map( (post, index)=> {
                return (
                   
                       <Post post={post} key={post._id} />

                      
                 
                )
              } ) : <div>Loading ... </div>}
          
            
        </div>

        <MyPagination cp={cp} np={10} />

      </div>
  )
}

export default Posts
