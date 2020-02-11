import React from 'react'
import StudentsIndex from './StudentsIndex'
import { Switch, Route, NavLink } from 'react-router-dom'
import './css/klassShow.css'

const KlassesShowContainer = ({ klass }) => {

  if (klass) {
    return (
      <div className="klass-show-wrapper">
        <div className="klass-show-header">
          <div className="klass-title">Class { klass.name }</div>
          <div>
            <NavLink to={`/classes/${klass.id}/students`}>
              <button className="myButton">Add Student</button>
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route path="/classes/:id/students"
            render={() => <StudentsIndex klass={klass} />}
          />
        </Switch>
      </div>
    )
  } else {
    return null
  }
}

export default KlassesShowContainer
