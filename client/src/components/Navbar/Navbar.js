import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode';
import {auth,logoutAction} from '../../app/reducers/userSlice'


import  '../Posts/style.css'


const Navbar = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userAuth = useSelector(state=>state.userSection.authData)
   

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  
  const logout= async()=>{
     //console.log ('Logout should be  done') 
     await dispatch(logoutAction()) 
     setUser(null)
     navigate('/auth')
      console.log ('userAuth in logout',userAuth) 
  }
  
  useEffect(() => {
     const token = user?.token
     if(token){
         const decodeToken = decode(token)
         if(decodeToken.exp * 1000 < new Date().getTime() ) logout()
         console.log ('decodeToken',decodeToken) 
        // console.log ('current time: ',(new Date()).getTime()) 
     }else{
      console.log ('No token') 
     }

     setUser(JSON.parse(localStorage.getItem('profile')));

    // console.log ('useEffect [location] in Navbar ==> userAuth: ',userAuth) 

    
  }, [location])

  useEffect(() => {
    
    setUser( JSON.parse(localStorage.getItem('profile')) );
    console.log ('userAuth [userAuth] in useEffect [Navbar] : ',userAuth) 
    
  }, [userAuth])
  
  
  return (
    <div style={{ height:"75px"}}>

        <div className='navbar' >
              <div style={{margin:"0 auto", width:"50%"}}> 
                <Link to="/">Home</Link> |
                <Link to="/posts">posts</Link> | 
                <Link to="/addPost">addPost</Link>

                
               {user?.result ? (

                 <>
                    &nbsp; &nbsp; 
                    <span className='ml-5'>
                      welcome - { user?.result?.name || user?.result?.email  }
                    </span>
                  
                      <span  onClick={logout} style={{margin:'0 50px'}}>
                        <Button style={{backgroundColor:'pink'}}>
                            logout
                        </Button>
                      
                      </span>
                </>
               ) : (
                    <Link to="/auth" style={{margin:'0 50px'}}>
                      <Button >
                          sign in
                      </Button>
                    
                    </Link>

               )}

                {/* <Badge style={{margin:'0 50px'}}> {user?.result?.name || user?.result?.email || 'No User'}  </Badge> */}


                
              
              </div>
        </div>
    </div>
  )
}

export default Navbar
