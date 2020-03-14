import React from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { newSeat } from '../../actions/studentActions.js'
import { connect } from 'react-redux'

const EmptyDesk = ({ klass, index, newSeat, type }) => {
  const [{ hover }, drop] = useDrop({
    accept: "desk",
    collect: monitor => {
      return ({ hover: monitor.isOver() })
    },
    drop: (item, monitor) => {
      newSeat(klass, item.student, index, type)
    },
  })

  return (
    <>
      <div ref={drop} className="desk-drop-area">
        <div className={`empty desk ${hover ? 'hover' : ''}`}>
        </div>
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    newSeat: (klass, student, seat, type) => dispatch(newSeat(klass, student, seat, type))
  }
}

export default connect(null, mapDispatchToProps)(EmptyDesk)
