import React from 'react'
import { connect } from 'react-redux'
import StudentForm from '../students/StudentForm'
import { deleteStudent } from '../../actions/studentActions.js'
import './css/studentIndex.css'

const StudentsIndex = ({ klass, students, deleteStudent }) => {
  return (
    <div className="student-index-wrapper">
      <div className="student-index-row header">
        <div>First Name</div>
        <div>Last Name</div>
        <div className="scores">Academic Score <br/>(5 is best)</div>
        <div className="scores">Behavior Score <br/>(5 is best)</div>
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
              <button onClick={() => deleteStudent(klass, student)}>Delete</button>
            </div>
          </div>
        )
      })}
      <StudentForm klass={ klass }/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (klass, student) => dispatch(deleteStudent(klass, student))
  }
}

export default connect(null, mapDispatchToProps)(StudentsIndex)
