import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../../actions/studentActions.js'
import StudentsIndex from '../students/StudentsIndex'
import PairDesksContainer from '../desks/PairDesksContainer'
import { Switch, Route, NavLink } from 'react-router-dom'
import './css/klassShow.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const KlassesShowContainer = ({ klass, fetchStudents, students }) => {
  useEffect(() => {
    if (klass) {fetchStudents(klass)}
  }, [klass])

  if (klass) {
    return (
      <DndProvider backend={Backend}>
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
              <NavLink to={`/classes/${klass.id}/pairs`}>
                <button className="myButton">Pairs</button>
              </NavLink>
            </div>
          </div>
          <Switch>
            <Route path="/classes/:id/students"
              render={() => <StudentsIndex klass={klass} students={students} />}
            />
            <Route path="/classes/:id/pairs"
              render={() => <PairDesksContainer klass={klass} students={students} />}
            />
          </Switch>
        </div>
      </DndProvider>
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
