import React from 'react'
import { useDragLayer } from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
}

const DeskDrag = () => {
  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset()
  }))

  return isDragging ? <div style={layerStyles}>
                        <div className={'desk'} style={getItemStyles(initialOffset, currentOffset)}>
                          {item.student.firstName}<br/>
                          {item.student.lastName}
                        </div>
                      </div>
                    : null
}

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

export default DeskDrag
