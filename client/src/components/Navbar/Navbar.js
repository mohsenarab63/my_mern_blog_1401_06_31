import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/">Home</Link> |
        <Link to="/posts">posts</Link> | 
        <Link to="/addPost">addPost</Link>
    </div>
  )
}

export default Navbar
