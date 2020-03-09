import React from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { newSeat } from '../../actions/studentActions.js'
import { connect } from 'react-redux'

const EmptyDesk2 = ({ klass, index, newSeat }) => {
  const [{ hover }, drop] = useDrop({
    accept: "desk",
    collect: monitor => {
      return ({ hover: monitor.isOver() })
    },
    drop: (item, monitor) => {
      newSeat(klass, item.student, index)
    },
  })

  return (
    <>
      <div ref={drop}>
        <div className={`empty desk ${hover ? 'hover' : ''}`}>
        </div>
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    newSeat: (klass, student, seat) => dispatch(newSeat(klass, student, seat))
  }
}

export default connect(null, mapDispatchToProps)(EmptyDesk2)
