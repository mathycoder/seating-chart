import React from 'react'
import Desk from './Desk'

const DesksContainer = ({ klass, students }) => {
  return (
    <div>
      {students.allIds.map(studentId => {
        const student = students.byId[studentId]
        return <Desk student={student}/>
      })}
    </div>
  )
}

export default DesksContainer
