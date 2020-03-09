import React from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { swapSeats2 } from '../../actions/studentActions.js'
import { connect } from 'react-redux'

const EmptyDesk2 = ({ klass, students, index, swap }) => {
  const [{ hover }, drop] = useDrop({
    accept: "desk",
    collect: monitor => {
      return ({ hover: monitor.isOver() })
    },
    drop: (item, monitor) => {
      //swap(klass, student, item.student)
    },
  })

  return (
    <>
      <div ref={drop}>
        <div className={`desk ${hover ? 'hover' : ''}`}>
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

export default connect(null, mapDispatchToProps)(EmptyDesk2)
