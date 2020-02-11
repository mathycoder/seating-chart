import React from 'react'

const StudentForm = () => {
  return (
    <div className="student-index-row student-form">
      <div>InputFirstName</div>
      <div>InputLastName</div>
      <div>AcademicScore</div>
      <div>BehaviorScore</div>
      <div className="student-edit-buttons">
        <button>Add</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default StudentForm
