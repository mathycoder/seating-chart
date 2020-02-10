import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions.js'

const KlassesContainer = ({ currentUser, fetchKlasses, klasses }) => {
  useEffect(() => {
    fetchKlasses()
  }, [])

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          {`${currentUser.firstName}'s Classes`}
        </div>

        {klasses.allIds.map(klassId => {
          const klass = klasses.byId[klassId]
          return (
            <div className="klass-row">
              {klass.name}
            </div>
          )
        })}

      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
