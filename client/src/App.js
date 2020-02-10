import React, { useEffect } from 'react';
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import SignUp from './components/teachers/SignUp'
import NavBar from './components/navBar/NavBar'
import KlassesContainer from './components/klasses/KlassesContainer'
import { getCurrentUser } from './actions/currentUserActions.js'
import { BrowserRouter as Router } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
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
          <PublicRoute path="/" component={Login} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/logout" component={Logout} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/classes" component={KlassesContainer} />
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
