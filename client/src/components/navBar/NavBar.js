import React from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="title"><strong>Flex</strong>Seats</div>
      <div><NavLink to="/login">Login</NavLink></div>
      <div><NavLink to="/signup">Sign Up</NavLink></div>
    </div>
  )
}

export default NavBar
