import React from 'react'
import { connect } from 'react-redux'

const StudentsIndex = ({ klass }) => {
  return (
    <div>
      Students Index {klass.name}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(null, mapDispatchToProps)(StudentsIndex)
