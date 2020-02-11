import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './css/studentIndex.css'

const StudentsIndex = ({ klass }) => {
  return (
    <div className="student-index">
      Students Index {klass.name}
    </div>
  )
}


export default connect(null, null)(StudentsIndex)
