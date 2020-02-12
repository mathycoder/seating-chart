import React, { useState } from 'react'
import { addStudent } from '../../actions/studentActions.js'
import { connect } from 'react-redux'
import './css/studentForm.css'

const StudentForm = ({ klass, addStudent }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [academicScore, setAcademicScore] = useState(1)
  const [behaviorScore, setBehaviorScore] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    const studentData = {
      student: {
        first_name: firstName,
        last_name: lastName,
        academic_score: academicScore,
        behavior_score: behaviorScore
      }
    }
    addStudent(klass, studentData)
  }

  return (
    <form
      className="student-index-row student-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <select name="academic-score"
          value={academicScore}
          onChange={(e) => setAcademicScore(e.target.value)}
        >
          {[1,2,3,4,5].map(score => (
            <option key={score} value={score}>{score}</option>
          )) }
        </select>
      </div>

      <div>
        <select name="behavior-score"
          value={behaviorScore}
          onChange={(e) => setBehaviorScore(e.target.value)}
        >
          {[1,2,3,4,5].map(score => (
            <option key={score} value={score}>{score}</option>
          )) }
        </select>
      </div>

      <div className="student-edit-buttons">
        <input type="submit" value="Add" />
        <button>Cancel</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (klass, studentData) => dispatch(addStudent(klass, studentData))
  }
}

export default connect(null, mapDispatchToProps)(StudentForm)
