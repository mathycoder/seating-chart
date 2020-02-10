import React from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = ({ currentUser }) => {
  return (
    <div className="navbar-wrapper">
      <div className="title"><strong>Flex</strong>Seats</div>
      <div><NavLink to="/login">Login</NavLink></div>
      <div><NavLink to="/logout">Logout</NavLink></div>
      <div><NavLink to="/signup">Sign Up</NavLink></div>
      { currentUser && currentUser !== 'none' ? <div><strong>{`Logged in as ${currentUser.firstName}`}</strong></div> : null }
    </div>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(NavBar)
