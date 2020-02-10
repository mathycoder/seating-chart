import React, { useState } from 'react'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitHandler = () => {
    const data = {
      email: email,
      password: password
    }
    //signupTeacher(data)
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          <strong>Flex</strong>Seats Sign Up
        </div>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => submitHandler()}
          className="myButton">Create Account
        </button>
      </div>
    </div>
  )
}

export default Login
