import React, { useEffect } from 'react';
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import SignUp from './components/teachers/SignUp'
import NavBar from './components/navBar/NavBar'
import KlassesContainer from './components/klasses/KlassesContainer'
import { getCurrentUser } from './actions/currentUserActions.js'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from 'react-redux'

const App = ({ getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/classes" component={KlassesContainer} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
