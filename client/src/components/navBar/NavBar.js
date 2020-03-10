import React, { useState } from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = ({ currentUser, klasses }) => {
  const [ klassDropdown, setKlassDropdown ] = useState(false)

  const title = () => <><strong>Flex</strong>Seats</>

  const renderKlassDropdown = () => {
    return (
      <div className={`dropdown-menu klass-dropdown ${klassDropdown ? 'opened': 'closed'}`}>
          {klasses.allIds.map((klassId, index) => {
            const klass = klasses.byId[klassId]
            return (
              <NavLink
                to={`/classes/${klass.id}`}
                onClick={() => setKlassDropdown(false)}
                key={index}
                >
                Class {klass.name}
              </NavLink>
              )
          })}
        </div>
    )
  }

  const loggedInNavBar = () => {
    return (
      <>
        <div className="title">
          <NavLink to="/classes">{title()}</NavLink>
        </div>
        <div className="dropdown-button" onClick={() => setKlassDropdown(!klassDropdown)}>
          Classes
        </div>
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
    <>
      <div className="navbar-wrapper">
        {currentUser && currentUser !== 'none' ? loggedInNavBar() : loggedOutNavBar()}
      </div>
      {renderKlassDropdown()}
    </>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    klasses: state.klasses
  }
}

export default connect(mapStateToProps, null)(NavBar)
