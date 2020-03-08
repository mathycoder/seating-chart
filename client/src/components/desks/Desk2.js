import React, { useState } from 'react'
import './css/desk.css'
import { useDrag } from 'react-dnd'

const Desk2 = ({ student, index }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "desk" },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <>
      <div ref={drag} className="desk">
        {student.firstName}<br/>
        {student.lastName}
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

export default Desk2
