import React from 'react'
import './css/desk.css'

const Desk = ({ student }) => {
  return (
    <div className="desk">
      {student.firstName}
    </div>
  )
}

export default Desk
