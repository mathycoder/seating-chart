import React, { useState } from 'react'
import './signup.css'
import { connect } from 'react-redux'
import { signupTeacher } from '../../actions/teacherActions.js'

const SignUp = ({ signupTeacher }) => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const submitHandler = () => {
    const data = {
      first_name: firstName,
      last_name: lastName
    }
    
    signupTeacher(data)
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

function mapStateToProps(state){
  return {}
}

function mapDispatchToProps(dispatch){
  return {
    signupTeacher: (data) => dispatch(signupTeacher(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
