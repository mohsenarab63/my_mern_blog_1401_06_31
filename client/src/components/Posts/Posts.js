import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {fetchAsyncPost,deleteAsyncPost,setCurrentPage} from '../../app/reducers/postsSlice'
import * as api from '../../api/index'

import MyPagination from './Pagination'
import { Link, useLocation } from 'react-router-dom'

function useQuery(){
   return new URLSearchParams(useLocation().search)
}

const Posts = () => {
  
  //const [posts, setPosts] = useState([])

   const dispatch = useDispatch()
  const query = useQuery()
  const page = query.get('page') || 1
  console.log ('query',query, 'page= ',page) 

  //const cp = useSelector(state=>state.postsSection.cp)
  const cp = page
  //console.log ('page ',page) 

  console.log ('Posts Components is running .. ') 

  let posts = useSelector(state=>state.postsSection.posts)
  console.log ('posts in Post Compoent [outside useEffect]: ',posts) 

  const API= axios.create({baseURL:'http://localhost:5000'}) 
  const handleDelete = async (id) => {
    console.log ('id: ',id) 
    const {data}= await api.deletePost(id) 
    console.log (data) 

   }

  useEffect(() => {

    console.log ('useEffect in posts, posts.length: ', posts.length) 
    
    // const all_posts =  API.get('/posts').then( (result)=> {
    //   setPosts(result.data)
    //       //console.log ('posts in useEffact: ',data) 
    // } ).catch(error => console.log (error) )

    console.log ('posts in Posts Compoentns [In useEffect]: ',posts) 

   

    // if(!posts.length)
    // dispatch(fetchAsyncPost())
    // .unwrap()
    // .then( results => {
    //            console.log ('dispatch(fetchAsyncPost())',results) 
          
    // } )
    // .catch( (rejectedValueOrSerializedError) => {
    //   // handle error here
    //   console.log ('Fetch with Error in UseEffect in Posts') 
    //   console.log (rejectedValueOrSerializedError) 
    // })
    
  },[dispatch])

  useEffect(() => {
     console.log ('Page is :',page) 
     dispatch(fetchAsyncPost({page}))
     
  }, [page,dispatch])
  
  
   
  

  //const posts = useSelector( (state) => state.postsSection.posts )  
  //setPosts(posts)

  return (
      <div>

          <div    className='post_container'>
              {posts.length ? posts.map( (post, index)=> {
                return (
                  <Link to={`/post/${post._id}`}>

                      <div className='post_item' key={index}   style={ {border:"1px solid #ccc", margin: "20px", padding:"5px", minWidth: "300px"} }>
                            <h6> <b>{post.name || ''}</b>  {post.title} </h6>
                            <div>
                                {post.message }
                            </div>
                            <button  onClick={()=>dispatch(deleteAsyncPost(post._id))}> delete </button>
                      </div>
                  </Link>
                )
              } ) : <div>Loading ... </div>}
          
            
        </div>

        <MyPagination cp={cp} np={10} />

      </div>
  )
}

export default Posts
