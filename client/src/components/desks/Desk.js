import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import './css/desk.css'
// import styled from 'styled-components'

const Desk = ({ student, index }) => {
  return (
    <>
      <Droppable droppableId={`droppable-${index}`}>
        {(provided) => (
          <div
            ref={node => provided.innerRef(node)}
            {...provided.droppableProps}
            className="desk-container"
          >
            <Draggable
              draggableId={`draggable-${student.id}`}
              index={index}
              key={`draggable-${student.id}`}
            >
              {(provided2) => (
                <div
                  className="desk"
                  {...provided2.draggableProps}
                  {...provided2.dragHandleProps}
                  ref={node => provided2.innerRef(node)}
                >
                  {student.firstName}<br/>
                  {student.lastName}
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {index % 2 === 1 ? <div className="gap"></div> : null}
    </>
  )
}

export default Desk
