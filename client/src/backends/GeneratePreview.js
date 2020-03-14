import React from 'react'

const GeneratePreview = ({itemType, item, style}) => {
  const { student } = item
  return (
    <div style={style} id="preview" className={`desk`}>
      <div className="first-name">{student.firstName}</div>
    </div>
  )
}

export default GeneratePreview
