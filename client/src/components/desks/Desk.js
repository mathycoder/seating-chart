import React from 'react'
import './css/desk.css'
import { useDrag, useDrop } from 'react-dnd'
import { swapSeats } from '../../actions/studentActions.js'
import { connect } from 'react-redux'
import MultiBackend, { Preview } from 'react-dnd-multi-backend';

const Desk = ({ klass, student, students, index, swap, type }) => {
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

  const generatePreview = ({itemType, item, style}) => {
    return (
      <div style={style}>
        {item}
      </div>
    )
  };

  // <div style={style} className={`desk`}>
  //   {student.firstName}
  //   <br/>
  //   {student.lastName}
  //   <br/>
  // </div>

  return (
    <>
      <div ref={drop}>
        <div ref={drag} className={`desk ${hover ? 'hover' : ''} ${isDragging ? 'dragging' : ''}`}>
          {student.firstName}
          <br/>
          {student.lastName}
          <br/>
          <span className="academic-score">{student.academicScore}</span>
          <span className="behavior-score">{student.behaviorScore}</span>
        </div>
        <Preview generator={generatePreview} />
      </div>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    swap: (klass, student1, student2, type) => dispatch(swapSeats(klass, student1, student2, type))
  }
}

export default connect(null, mapDispatchToProps)(Desk)
