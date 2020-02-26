import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../../actions/studentActions.js'
import StudentsIndex from '../students/StudentsIndex'
import DesksContainer from '../desks/DesksContainer'
import GroupDesksContainer from '../desks/GroupDesksContainer'
import { Switch, Route, NavLink } from 'react-router-dom'
import './css/klassShow.css'

const KlassesShowContainer = ({ klass, fetchStudents, students }) => {
  const [pairSeating, setPairSeating] = useState(true)

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
          <div>
            <button
              className="myButton"
              onClick={() => setPairSeating(true)}>Pairs
            </button>
          </div>
          <div>
            <button
              className="myButton"
              onClick={() => setPairSeating(false)}>Groups
            </button>
          </div>
        </div>
        <Switch>
          <Route exact path="/classes/:id"
            render={() => pairSeating ? <DesksContainer klass={klass} students={students} />
          : <GroupDesksContainer klass={klass} students={students} />
            }
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
