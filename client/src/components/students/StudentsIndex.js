import React, { useState } from 'react'
import { connect } from 'react-redux'
import StudentForm from '../students/StudentForm'
import { deleteStudent } from '../../actions/studentActions.js'
import './css/studentIndex.css'

const StudentsIndex = ({ klass, students, deleteStudent }) => {
  const [showForm, setShowForm] = useState(false)
  const [editStudentId, setEditStudentId] = useState(null)

  return (
    <>
      <div className="student-index-wrapper">
        <div className="student-index-row header">
          <div>First Name</div>
          <div>Last Name</div>
          <div className="scores">Acad. Score <br/>(5 is best)</div>
          <div className="scores">Behav. Score <br/>(5 is best)</div>
          <div></div>
        </div>
        {students.allIds.map(studentId => {
          const student = students.byId[studentId]
          return (
            <div key={studentId}>
              {editStudentId && student.id === editStudentId
                ? <StudentForm
                    klass={klass}
                    student={student}
                    setEditStudentId={setEditStudentId}
                  />
                : <div key={studentId} className="student-index-row">
                    <div>{student.firstName}</div>
                    <div>{student.lastName}</div>
                    <div className="scores">{student.academicScore}</div>
                    <div className="scores">{student.behaviorScore}</div>
                    <div className="student-edit-buttons">
                      <button className="myButton little" onClick={() => setEditStudentId(student.id)}>Edit</button>
                      <button className="myButton little" onClick={() => deleteStudent(klass, student)}>Delete</button>
                    </div>
                  </div>
              }
            </div>
          )
        })}
        {showForm ? <StudentForm klass={ klass }/> : null}
        <button
          className="myButton"
          id="add-student-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (klass, student) => dispatch(deleteStudent(klass, student))
  }
}

export default connect(null, mapDispatchToProps)(StudentsIndex)
