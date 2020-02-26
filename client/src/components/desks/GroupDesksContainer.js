import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(({value}) => <div>{value}</div>)

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});

const GroupDesksContainer = ({ klass, students }) => {

  const myStudents = () => {
    return students.allIds.map(stId => {
      const student = students.byId[stId]
      return student.firstName
    })
  }

  return <SortableList items={myStudents()} />
}

export default GroupDesksContainer
