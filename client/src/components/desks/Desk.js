import React from 'react'
import './css/desk.css'

const Desk = ({ student }) => {
  return (
    <div draggable className="desk">
      {student.firstName}<br/>
      {student.lastName}
    </div>
  )
}

export default Desk
