import React from 'react'
import { connect } from 'react-redux'

const GeneratePreview = ({itemType, item, style,
                          currentBehavior, currentAcademics}) => {
  const { student } = item
  return (
    <div style={style} id="preview" className={`desk`}>
      <div className={`${currentAcademics || currentBehavior ? '' : 'groove'}`}/>
      <div className="first-name">{student.firstName}</div>
      <div className="last-name">{student.lastName}</div>
      <div className="ratings">
        {currentAcademics ? <span className="academic-score">{student.academicScore}</span> : null}
        {currentBehavior ? <span className="behavior-score">{student.behaviorScore}</span> : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentBehavior: state.currentKlass.behavior,
    currentAcademics: state.currentKlass.academics
  }
}

export default connect(mapStateToProps, null)(GeneratePreview)
