import React from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = ({ currentUser }) => {

  const title = () => <><strong>Flex</strong>Seats</>

  const loggedInNavBar = () => {
    return (
      <>
        <div className="title">
          <NavLink to="/classes">{title()}</NavLink>
        </div>
        <div><strong>{`Logged in as ${currentUser.firstName}`}</strong></div>
        <div><NavLink to="/logout">Logout</NavLink></div>
      </>
    )
  }

  const loggedOutNavBar = () => {
    return (
      <>
        <div className="title">{title()}</div>
        <div><NavLink to="/login">Login</NavLink></div>
        <div><NavLink to="/signup">Sign Up</NavLink></div>
      </>
    )
  }

  return (
    <div className="navbar-wrapper">
      {currentUser && currentUser !== 'none' ? loggedInNavBar() : loggedOutNavBar()}
    </div>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(NavBar)
