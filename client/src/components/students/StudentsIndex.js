import React, { useState } from 'react'
import { connect } from 'react-redux'
import StudentForm from '../students/StudentForm'
import { deleteStudent } from '../../actions/studentActions.js'
import './css/studentIndex.css'

const StudentsIndex = ({ klass, students, deleteStudent }) => {
  const [showForm, setShowForm] = useState(false)
  const [editStudentId, setEditStudentId] = useState(null)
  const [filter, setFilter] = useState('lastName')
  const [order, setOrder] = useState('ascending')

  const studentIdsByFilter = (filter, order ) => {
    return students.allIds.sort((idA, idB) => {
      const studentA = students.byId[idA]
      const studentB = students.byId[idB]
      debugger
      if (studentA[filter] > studentB[filter]) { return order === 'ascending' ? 1 : -1 }
      else if (studentA[filter] < studentB[filter]) { return order === 'ascending' ? -1 : 1 }
      else { return 0 }
    })
  }

  return (
    <div className="student-index-page noselect">
      <div className="student-index-wrapper">
        <div className="student-index-row header">
          {
            [['firstName', 'First Name'],
            ['lastName', 'Last Name'],
            ['academicScore', 'Acad. Score'],
            ['behaviorScore', 'Behav. Score']].map(item => (
              <div>
                <div>{item[1]}</div>
                <span
                  onClick={() => {
                    setFilter(item[0])
                    setOrder('ascending')
                  }}
                >
                  &#x25B2;
                </span>

                <span
                  onClick={() => {
                    setFilter(item[0])
                    setOrder('descending')
                  }}
                >&#x25BC;</span>
              </div>
            ))
          }
        </div>
        {studentIdsByFilter(filter, order).map(studentId => {
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
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (klass, student) => dispatch(deleteStudent(klass, student))
  }
}

export default connect(null, mapDispatchToProps)(StudentsIndex)
