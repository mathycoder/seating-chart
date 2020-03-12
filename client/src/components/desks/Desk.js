import React from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { swapSeats } from '../../actions/studentActions.js'
import { connect } from 'react-redux'
// import MultiBackend, { Preview } from 'react-dnd-multi-backend';

const Desk = ({ klass, student, students, index, swap, type, currentRatings }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "desk", student: student },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ hover }, drop] = useDrop({
    accept: "desk",
    collect: monitor => {
      return ({ student: student, hover: monitor.isOver() })
    },
    drop: (item, monitor) => {
      swap(klass, student, item.student, type)
    },
  })

  return (
    <>
      <div ref={drop}>
        <div ref={drag} className={`desk ${hover ? 'hover' : ''} ${isDragging ? 'dragging' : ''}`}>
          <div className="first-name">{student.firstName}</div>
          <div className="last-name">{student.lastName}</div>
          { currentRatings
            ?  <div className="ratings">
                  <span className="academic-score">{student.academicScore}</span>
                  <span className="behavior-score">{student.behaviorScore}</span>
                </div>
            : null
          }    
        </div>
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentRatings: state.currentKlass.ratings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    swap: (klass, student1, student2, type) => dispatch(swapSeats(klass, student1, student2, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Desk)
