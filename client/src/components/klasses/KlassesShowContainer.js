import React from 'react'

const KlassesShowContainer = ({ klass }) => {



  if (klass) {
    return (
      <div>
        <h1>Class { klass.name }</h1>
      </div>
    )
  } else {
    return null
  }
}

export default KlassesShowContainer
