import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {fetchAsyncPost} from '../../app/reducers/postsSlice'


const Posts = () => {
  
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()

  

  const API= axios.create({baseURL:'http://localhost:5000'}) 
  useEffect(() => {
    
    // const all_posts =  API.get('/posts').then( (result)=> {
    //   setPosts(result.data)
    //       //console.log ('posts in useEffact: ',data) 
    // } ).catch(error => console.log (error) )

    dispatch(fetchAsyncPost())
    .unwrap()
    .then( results => {
          console.log ('Fetch Succesfulyy in UseEffect in Posts') 
          console.log ('results: ',results) 
          setPosts(results)
    } )
    .catch( (rejectedValueOrSerializedError) => {
      // handle error here
      console.log ('Fetch with Error in UseEffect in Posts') 
      console.log (rejectedValueOrSerializedError) 
    })
    
  },[dispatch])
  

  //const posts = useSelector( (state) => state.postsSection.posts )  
  //setPosts(posts)

  return (
      <div    className='post_container'>
      {posts.length ? posts.map( ({title, message}, index)=> {
         return (
             <div className='post_item' key={index}   style={ {border:"1px solid #ccc", margin: "20px", padding:"5px", minWidth: "300px"} }>
                  <h6>  {title} </h6>
                  <div>
                      {message }
                  </div>
             </div>
         )
      } ) : <div>Loading ... </div>}
        
    </div>
  )
}

export default Posts
