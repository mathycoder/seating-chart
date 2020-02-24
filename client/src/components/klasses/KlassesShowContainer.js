import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../../actions/studentActions.js'
import StudentsIndex from '../students/StudentsIndex'
import DesksContainer from '../desks/DesksContainer'
import { Switch, Route, NavLink } from 'react-router-dom'
import './css/klassShow.css'

const KlassesShowContainer = ({ klass, fetchStudents, students }) => {
  useEffect(() => {
    if (klass) {fetchStudents(klass)}
  }, [klass])

  if (klass) {
    return (
      <div className="klass-show-wrapper">
        <div className="klass-show-header">
          <div className="klass-title">
            <NavLink to={`/classes/${klass.id}`}>Class { klass.name }</NavLink>
          </div>
          <div>
            <NavLink to={`/classes/${klass.id}/students`}>
              <button className="myButton">Manage Students</button>
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path="/classes/:id"
            render={() => <DesksContainer klass={klass} students={students} />}
          />
          <Route path="/classes/:id/students"
            render={() => <StudentsIndex klass={klass} students={students} />}
          />
        </Switch>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesShowContainer)
