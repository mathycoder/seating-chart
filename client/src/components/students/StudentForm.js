import React, { useState } from 'react'
import './css/studentForm.css'

const StudentForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [academicScore, setAcademicScore] = useState(1)
  const [behaviorScore, setBehaviorScore] = useState(1)

  return (
    <form className="student-index-row student-form">
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
        <button>Add</button>
        <button>Cancel</button>
      </div>
    </form>
  )
}

export default StudentForm
