import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from './components/Posts/addPost';
 import Posts from './components/Posts/Posts'
 import Navbar from './components/Navbar/Navbar';



function App() {

  // const posts = useSelector( (state)=> state.postsSection )
  // console.log (posts) 

  useEffect(() => {
    
  
    
  }, )
  
  return (
      <BrowserRouter >
          <Navbar />
              
          <Routes> 
          
               <Route path="/" exact element={ <div> Main Page </div> } />
               <Route path="/addPost" exact element={ <AddPost /> } />
               <Route path="/posts" exact element={ <Posts />  } />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
