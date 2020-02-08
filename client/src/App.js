import React from 'react';
import Login from './sessions/Login'
import NavBar from './navBar/NavBar'
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Route exact path="/" component={Login} />
        </main>
      </div>
    </Router>
  );
}

export default App;
