import React from 'react'
import { connect } from 'react-redux'
import StudentForm from '../students/StudentForm'
import './css/studentIndex.css'

const StudentsIndex = ({ klass, students }) => {
  return (
    <div className="student-index-wrapper">
      <div className="student-index-row header">
        <div>First Name</div>
        <div>Last Name</div>
        <div>Academic Score</div>
        <div>Behavior Score</div>
        <div></div>
      </div>
      {students.allIds.map(studentId => {
        const student = students.byId[studentId]
        return (
          <div key={studentId} className="student-index-row">
            <div>{student.firstName}</div>
            <div>{student.lastName}</div>
            <div className="scores">{student.academicScore}</div>
            <div className="scores">{student.behaviorScore}</div>
            <div className="student-edit-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        )
      })}
      <StudentForm />
    </div>
  )
}


export default connect(null, null)(StudentsIndex)
