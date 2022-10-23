import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode';
import {auth,logoutAction} from '../../app/reducers/userSlice'
import {Nav,  Container, Navbar as NavbarBs} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';



import  '../Posts/style.css'

function ExitIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg>
  )
}


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

    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
    <Container>
         <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}  >Home </Nav.Link>
          
            <Nav.Link to="/posts" as={NavLink}  >Posts </Nav.Link>
         
            <Nav.Link to="/addPost" as={NavLink}  >Add Post </Nav.Link>
         </Nav>
         <span className='text-muted mx-3'>{user?.result && user?.result?.name }</span>
         {user?.result ? (
          <Button onClick={logout} style={{width:"3rem", height:"3rem", position:"relative"}} variant="outline-primary" className="rounded-circle" >
                  
               
                                          
                            
                              
                                  <ExitIcon />
                            
                              
                            
                      
                     

             
          </Button>
         ) : (
          <Link to="/auth" style={{margin:'0 50px'}}>
                      <Button  variant="outline-primary">
                         sign in
                    </Button>
                    
          </Link>
         )}
       
    </Container>
</NavbarBs>







    // <div style={{ height:"75px"}}>

    //     <div className='navbar' >
    //           <div style={{margin:"0 auto", width:"50%"}}> 
    //             <Link to="/">Home</Link> |
    //             <Link to="/posts">posts</Link> | 
    //             <Link to="/addPost">addPost</Link>

                
    //            {user?.result ? (

    //              <>
    //                 &nbsp; &nbsp; 
    //                 <span className='ml-5'>
    //                   welcome - { user?.result?.name || user?.result?.email  }
    //                 </span>
                  
    //                   <span  onClick={logout} style={{margin:'0 50px'}}>
    //                     <Button style={{backgroundColor:'pink'}}>
    //                         logout
    //                     </Button>
                      
    //                   </span>
    //             </>
    //            ) : (
    //                 <Link to="/auth" style={{margin:'0 50px'}}>
    //                   <Button >
    //                       sign in
    //                   </Button>
                    
    //                 </Link>

    //            )}

    //             {/* <Badge style={{margin:'0 50px'}}> {user?.result?.name || user?.result?.email || 'No User'}  </Badge> */}


                
              
    //           </div>
    //     </div>
    // </div>
  )
}

export default Navbar
