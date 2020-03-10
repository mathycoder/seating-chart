import React from 'react'

const GeneratePreview = ({itemType, item, style}) => {
  const { student } = item
  return (
    <div style={style} className={`desk`}>
      {student.firstName}
      <br/>
      {student.lastName}
      <br/>
      <span className="academic-score">{student.academicScore}</span>
      <span className="behavior-score">{student.behaviorScore}</span>
    </div>
  )
}

export default GeneratePreview
