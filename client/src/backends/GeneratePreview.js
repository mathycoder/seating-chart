import React from 'react'

const GeneratePreview = ({itemType, item, style}) => {
  const { student } = item
  return (
    <div style={style} id="preview" className={`desk`}>
      <div className={`groove`}/>
      <div className="first-name">{student.firstName}</div>
      <div className="last-name">{student.lastName}</div>
    </div>
  )
}



export default GeneratePreview
