import React, { useState, useRef, useEffect } from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = ({ currentUser, klasses, currentKlass }) => {
  const [ klassDropdown, _setKlassDropdown ] = useState(false)
  const refKlassDropdown = useRef()
  const refKlassButton = useRef()
  const [ groupingDropdown, _setGroupingDropdown ] = useState(false)
  const refGroupingDropdown = useRef()
  const refGroupingButton = useRef()

  const klassDropdownRef = React.useRef(klassDropdown);
    const setKlassDropdown = data => {
      klassDropdownRef.current = data;
      _setKlassDropdown(data);
    };

  const groupingDropdownRef = React.useRef(klassDropdown);
    const setGroupingDropdown = data => {
      groupingDropdownRef.current = data;
      _setGroupingDropdown(data);
    };

  const handleClick = (e) => {
    if (klassDropdownRef.current){
      if (refKlassDropdown.current.contains(e.target) || refKlassButton.current.contains(e.target)) { return }
      setKlassDropdown(false)
    }
    if (groupingDropdownRef.current){
      if (refGroupingDropdown.current.contains(e.target) || refGroupingButton.current.contains(e.target)) { return }
      setGroupingDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const title = () => <><strong>Flex</strong>Seats</>

  const renderKlassDropdown = () => {
    return (
      <div
        ref={refKlassDropdown}
        className={`dropdown-menu klass-dropdown ${klassDropdown ? 'opened': 'closed'}`}>
          {klasses.allIds.map((klassId, index) => {
            const klass = klasses.byId[klassId]
            return (
              <NavLink
                to={`/classes/${klass.id}/pairs`}
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

  const renderGroupingDropdown = () => {
    return (
      <div
        ref={refGroupingDropdown}
        className={`dropdown-menu grouping-dropdown ${groupingDropdown ? 'opened': 'closed'}`}>
          {["Pairs", "Groups"].map((type, index) => {
            return (
              <NavLink
                to={`/classes/${currentKlass.id}/${type.toLowerCase()}`}
                onClick={() => setGroupingDropdown(false)}
                key={index}
                >
                {type}
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
        <div className="dropdown-button" ref={refKlassButton} onClick={() => setKlassDropdown(!klassDropdown)}>
          {currentKlass ? `Class ${currentKlass.name}` : 'Classes'}
        </div>
        {currentKlass ?
          <div className="dropdown-button" ref={refGroupingButton} onClick={() => setGroupingDropdown(!groupingDropdown)}>
            Grouping
          </div>
          : null
        }

        <div id="logout-button"><NavLink to="/logout">Logout</NavLink></div>
      </>
    )
  }

  const loggedOutNavBar = () => {
    return (
      <>
        <div className="title">{title()}</div>
        <div id="login-button"><NavLink to="/login">Login</NavLink></div>
        <div id="signup"><NavLink to="/signup">Sign Up</NavLink></div>
      </>
    )
  }

  return (
    <>
      <div className="navbar-wrapper">
        {currentUser && currentUser !== 'none' ? loggedInNavBar() : loggedOutNavBar()}
      </div>
      {renderKlassDropdown()}
      {currentKlass ? renderGroupingDropdown(): null}
    </>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentKlass: state.currentKlass,
    klasses: state.klasses
  }
}

export default connect(mapStateToProps, null)(NavBar)
