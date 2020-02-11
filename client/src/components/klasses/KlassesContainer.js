import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions.js'
import { NavLink } from 'react-router-dom'
import KlassForm from './KlassForm'
import './css/klassesContainer.css'

const KlassesContainer = ({ currentUser, fetchKlasses, klasses }) => {
  const [displayForm, displayFormSet] = useState(false)
  const [editKlassId, setEditKlassId] = useState(null)

  useEffect(() => {
    fetchKlasses()
  }, [])

  return (
    <div className="signup-wrapper klass-index-wrapper">
      <div className="signup-form klass-index">
        <div className="flexseats-title">
          {`${currentUser.firstName}'s Classes`}
        </div>

        <div className="klass-row">
          <div><strong>Period</strong></div>
          <div><strong>Name</strong></div>
          <div></div>
        </div>

        {klasses.allIds.map(klassId => {
          const klass = klasses.byId[klassId]
          if (klassId !== editKlassId){
            return (
              <div className="klass-row" key={klassId}>
                <div>{klass.period}</div>
                <div>{klass.name}</div>
                <div>
                  <button
                    onClick={() => setEditKlassId(klassId)}
                    className="myButton">Edit</button>
                </div>
              </div>
            )
          } else {
            return <KlassForm
                      setEditKlassId={setEditKlassId}
                      key={klassId}
                      klass={klass}
                    />
          }

        })}
        { displayForm ? <KlassForm displayFormSet={displayFormSet}/> : null }
        { !displayForm && !editKlassId ? <button
          onClick={() => displayFormSet(!displayForm)}
          className="myButton">Create Class</button> : null}
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
