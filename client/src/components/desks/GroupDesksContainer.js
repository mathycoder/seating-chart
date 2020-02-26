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
      {[...Array(Math.ceil(students.allIds.length / 4)).keys()].map((groupNum, index) => (
          <Group axis="xy" students={myStudents.slice(index*4,(index+1)*4)} />
      ))}
    </div>
  )
}

export default GroupDesksContainer
