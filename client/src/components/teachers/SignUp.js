import React, { useState } from 'react'
import './signup.css'

const SignUp = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const submitHandler = () => {
    console.log(firstName, lastName)
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          <strong>Flex</strong>Seats Sign Up
        </div>
        <input
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button
          onClick={() => submitHandler()}
          className="myButton">Create Account
        </button>
      </div>
    </div>
  )
}

export default SignUp
