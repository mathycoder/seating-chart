import React from 'react';
import Login from './components/sessions/Login'
import SignUp from './components/teachers/SignUp'
import NavBar from './components/navBar/NavBar'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"

function App() {
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
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
