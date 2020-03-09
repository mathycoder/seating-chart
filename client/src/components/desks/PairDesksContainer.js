import React from 'react'
import Desk2 from './Desk2'
import EmptyDesk2 from './EmptyDesk2'
import { useDrag } from 'react-dnd'

const PairDesksContainer = ({ klass, students }) => {

  const studentsInTheirSeats = () => {
    return students.allIds.sort((a,b) => {
      const studentA = students.byId[a]
      const studentB = students.byId[b]
      return studentA.seat - studentB.seat
    })
  }

  const seats = () => {
    return [...Array(32).keys()].map(seatNumber => {
      const studentId = students.allIds.find(stId => {
        const st = students.byId[stId]
        return st.seat === seatNumber
      })
      return studentId ? studentId : null
    })
  }

  return (
    <div className="desks-container">
      {seats().map((studentId, index) => {
        const student = students.byId[studentId]
        return student ?
              <Desk2
                key={index}
                klass={klass}
                student={student}
                index={index}
                students={students}
               />
             : <EmptyDesk2
                key={index}
                index={index}
               />

      })}
    </div>
  )
}

export default PairDesksContainer
