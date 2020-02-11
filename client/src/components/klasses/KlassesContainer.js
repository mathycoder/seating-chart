import React, { useEffect } from 'react'
import KlassesIndexContainer from './KlassesIndexContainer'
import KlassesShowContainer from './KlassesShowContainer'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import KlassForm from './KlassForm'
import './css/klassesIndexContainer.css'

const KlassesContainer = ({ fetchKlasses, klasses }) => {
  useEffect(() => {
    fetchKlasses()
  }, [])

  return (
    <>
      <Switch>
        <Route exact path="/classes" component={KlassesIndexContainer} />
        <Route path="/classes/:id"
          render={({ match }) => {
            const klass = klasses.byId[`klass${match.params.id}`]
            return <KlassesShowContainer klass={klass}/>
          }}
        />
      </Switch>
    </>
  )
}

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
