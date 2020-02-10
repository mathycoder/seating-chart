import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions.js'

const KlassesContainer = ({ currentUser, fetchKlasses }) => {
  useEffect(() => {
    fetchKlasses()
  }, [])

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          {`${currentUser.firstName}'s Classes`}
        </div>

      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
