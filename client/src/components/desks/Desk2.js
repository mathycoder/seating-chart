import React, { useState } from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { swapSeats2 } from '../../actions/studentActions.js'
import { connect } from 'react-redux'

const Desk2 = ({ klass, student, students, index, swap }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "desk", student: student },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [collectedProps, drop] = useDrop({
    accept: "desk",
    collect: () => ({ student: student }),
    drop: (item, monitor) => {
      swap(klass, student, item.student)
    },
  })

  return (
    <>
      <div ref={drop}>
        <div ref={drag} className="desk">
          {student.firstName}<br/>
          {student.lastName}
        </div>
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    swap: (klass, student1, student2) => dispatch(swapSeats2(klass, student1, student2))
  }
}

export default connect(null, mapDispatchToProps)(Desk2)
