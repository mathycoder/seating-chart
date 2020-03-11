import React from 'react'

const GeneratePreview = ({itemType, item, style}) => {
  const { student } = item
  return (
    <div style={style} className={`desk`}>
      <div className="first-name">{student.firstName}</div>
      <div className="last-name">{student.lastName}</div>
      <div className="ratings">
        <span className="academic-score">{student.academicScore}</span>
        <span className="behavior-score">{student.behaviorScore}</span>
      </div>
    </div>
  )
}

export default GeneratePreview
