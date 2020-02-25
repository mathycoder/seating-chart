import React from 'react'
import Desk from './Desk'
import './css/desks-container.css'
import { swapSeats } from '../../actions/studentActions.js'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

const DesksContainer = ({ klass, students, swapSeats }) => {
  const handleDragEnd = (result) => {
    const studentId = result.draggableId.split("-")[1]
    const indexData = {
      originalIndex: result.source.index,
      newIndex: result.destination.index
    }
    swapSeats(klass, studentId, indexData)
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
      onDragEnd={(result) => handleDragEnd(result)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    swapSeats: (klass, studentId, indexData) => dispatch(swapSeats(klass, studentId, indexData))
  }
}

export default connect(null, mapDispatchToProps)(DesksContainer)
