import React from 'react'
import Desk from './Desk'
import './css/desks-container.css'
import { DragDropContext } from 'react-beautiful-dnd'

const DesksContainer = ({ klass, students }) => {
  const handleDragEnd = () => {
    console.log("drag ended!")
  }
  
  return (
    <DragDropContext onDragEnd={() => handleDragEnd()}>
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
    </DragDropContext>
  )
}

export default DesksContainer
