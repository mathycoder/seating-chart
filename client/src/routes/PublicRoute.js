import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, path, currentUser }) => (
  <Route exact path={path}
    render={(props) => (
      currentUser === "none" ? <Component {...props} /> : <Redirect to="/classes"/>
    )}
  />
)

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(PublicRoute)
