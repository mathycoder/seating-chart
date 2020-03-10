import React, { useEffect } from 'react'
import Desk from './Desk'
import EmptyDesk from './EmptyDesk'
import DeskDrag from './DeskDrag'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import { setCurrentGroup } from '../../actions/currentKlassActions.js'
import './css/desks-containers.css'

const PairDesksContainer = ({ klass, students, setCurrentGroup }) => {
  useEffect(() => {
    setCurrentGroup("Pairs")
  }, [])

  const studentsInTheirSeats = () => {
    return students.allIds.sort((a,b) => {
      const studentA = students.byId[a]
      const studentB = students.byId[b]
      return studentA.seatPair - studentB.seatPair
    })
  }

  const seats = () => {
    return [...Array(32).keys()].map(seatNumber => {
      const studentId = students.allIds.find(stId => {
        const st = students.byId[stId]
        return st.seatPair === seatNumber
      })
      return studentId ? studentId : null
    })
  }

  return (
    <div className="pair-desks-container">
      {seats().map((studentId, index) => {
        const student = students.byId[studentId]
        return student ?
              <Desk
                type={"pair"}
                key={index}
                klass={klass}
                student={student}
                index={index}
                students={students}
               />
             : <EmptyDesk
                type={"pair"}
                key={index}
                index={index}
                klass={klass}
               />
      })}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentGroup: group => dispatch(setCurrentGroup(group))
  }
}

export default connect(null, mapDispatchToProps)(PairDesksContainer)
