import React, { useState } from 'react'
import Desk from './Desk'
import './css/desks-container.css'
import { DragDropContext } from 'react-beautiful-dnd'

const DesksContainer = ({ klass, students }) => {
  const handleDragEnd = () => {
    console.log("drag ended!")
  }

  const studentsInTheirSeats = () => {
    return students.allIds.sort((a,b) => {
      const studentA = students.byId[a]
      const studentB = students.byId[b]
      return studentA.seat - studentB.seat
    })
  }

  return (
    <DragDropContext
      onDragEnd={() => handleDragEnd()}
    >
      <div className="desks-container">
        {studentsInTheirSeats().map((studentId, index) => {
          const student = students.byId[studentId]
          return (
            <>
              <Desk student={student} index={index}/>
              {index % 2 === 1 ? <div className="gap"></div> : null}
            </>
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default DesksContainer
