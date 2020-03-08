import React from 'react'
import Desk2 from './Desk2'
import { useDrag } from 'react-dnd'

const PairDesksContainer = ({ klass, students }) => {

  const studentsInTheirSeats = () => {
    return students.allIds.sort((a,b) => {
      const studentA = students.byId[a]
      const studentB = students.byId[b]
      return studentA.seat - studentB.seat
    })
  }

  return (
    <div className="desks-container">
      {studentsInTheirSeats().map((studentId, index) => {
        const student = students.byId[studentId]
        return <Desk2 key={index} klass={klass} student={student} index={index} students={students} />
      })}
    </div>
  )
}

export default PairDesksContainer
