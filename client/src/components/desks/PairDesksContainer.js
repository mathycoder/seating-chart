import React from 'react'
import { DndProvider, useDrag } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const PairDesksContainer = ({ klass, students }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "desk" },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag}>
      Pair Desks Container
    </div>
  )
}

export default PairDesksContainer
