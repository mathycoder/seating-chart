import React, { useState } from 'react'
import './signup.css'

const SignUp = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')


  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          <strong>Flex</strong>Seats Sign Up
        </div>
        <input type="text" placeholder="Enter first name"/>
        <input type="text" placeholder="Enter last name"/>
        <button className="myButton">Create Account</button>
      </div>
    </div>
  )
}

export default SignUp
