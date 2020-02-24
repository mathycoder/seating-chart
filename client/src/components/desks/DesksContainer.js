import React from 'react'
import Desk from './Desk'
import './css/desks-container.css'

const DesksContainer = ({ klass, students }) => {
  return (
    <div className="desks-container">
      {students.allIds.map((studentId, index) => {
        const student = students.byId[studentId]
        return (
          <>
            <Desk student={student}/>
            {index % 2 === 1 ? <div className="gap"></div> : null}
          </>
        )
      })}
    </div>
  )
}

export default DesksContainer
