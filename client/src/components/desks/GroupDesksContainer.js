import React from 'react'
import './css/group-desk.css'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(({student}) => {
  return (
    <div className="group-desk">
      {student.firstName}<br/>
      {student.lastName}
    </div>
  )
})

const Group = SortableContainer(({students}) => {
  return (
    <div className="group">
      {students.map((student, index) => (
        <SortableItem key={`item-${student.id}`} index={index} student={student} />
      ))}
    </div>
  );
});

const GroupDesksContainer = ({ klass, students }) => {
  const myStudents = students.allIds.map(stId => students.byId[stId])
  return (
    <div className="group-seating-wrapper">
      <Group axis="xy" students={myStudents.slice(0,4)} />
      <Group axis="xy" students={myStudents.slice(4,8)} />
    </div>
  )
}

export default GroupDesksContainer
