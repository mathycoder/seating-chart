import React, { useEffect } from 'react';
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import SignUp from './components/teachers/SignUp'
import NavBar from './components/navBar/NavBar'
import KlassesContainer from './components/klasses/KlassesContainer'
import { getCurrentUser } from './actions/currentUserActions.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import { connect } from 'react-redux'

const App = ({ currentUser, getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser()
  }, [])

  const renderRoutes = () => {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute path="/classes" component={KlassesContainer} />
      </Switch>
    )
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          { currentUser ? renderRoutes() : null }
        </main>
      </div>
    </Router>
  );
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
