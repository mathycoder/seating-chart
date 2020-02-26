import React, { useState } from 'react'
import Desk from './Desk'
import './css/desks-container.css'
import { swapSeats } from '../../actions/studentActions.js'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

const DesksContainer = ({ klass, students, swapSeats }) => {
  const [startingDesk, setStartingDesk] = useState(null)
  const [overDesk, setOverDesk] = useState(null)

  const handleDragStart = props => {
    setStartingDesk(props.source.index)
  }

  const handleDragUpdate = update => {
    if (!update.destination) {
      setOverDesk(null)
      return
    }
    const studentSeat = update.destination.index
    const studentId = students.allIds.find(stId => {
      const student = students.byId[stId]
      return student.seat === studentSeat
    })
    setOverDesk(students.byId[studentId])
  }

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result
    setStartingDesk(null)
    setOverDesk(null)

    if (!destination || destination.index === source.index) {
      return
    }

    const studentId = draggableId.split("-")[1]
    const indexData = {
      originalIndex: source.index,
      newIndex: destination.index
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
      onDragUpdate={(update) => handleDragUpdate(update)}
      onDragStart={(props) => handleDragStart(props)}
    >
      <div className="desks-container">
        {studentsInTheirSeats().map((studentId, index) => {
          const student = students.byId[studentId]
          return <Desk key={index} student={student} index={index} startingDesk={startingDesk} overDesk={overDesk}/>
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
