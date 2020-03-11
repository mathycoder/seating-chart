import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStudents, dynamicPairs } from '../../actions/studentActions.js'
import { setCurrentKlass } from '../../actions/currentKlassActions.js'
import StudentsIndex from '../students/StudentsIndex'
import PairDesksContainer from '../desks/PairDesksContainer'
import GroupDesksContainer from '../desks/GroupDesksContainer'
import { Switch, Route, NavLink } from 'react-router-dom'
import './css/klassShow.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from '../../backends/HTML5toTouch'
import GeneratePreview from '../../backends/GeneratePreview'

const KlassesShowContainer = ({ klass, fetchStudents, students, dynamicPairs, setCurrentKlass, currentGrouping }) => {

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }
  }, [klass])


// <DndProvider backend={Backend}>

  if (klass) {
    return (
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Preview generator={GeneratePreview} />
        <div className="klass-show-wrapper">
          <div className="klass-show-header">
            {currentGrouping === "Pairs"
              ? <div>
                  <button onClick={() => dynamicPairs(klass)} className="myButton">Generate Dynamic Pairs</button>
                </div>
              : null
            }

          </div>
          <div className="desks-wrapper">
            <Switch>
              <Route path="/classes/:id/students"
                render={() => <StudentsIndex klass={klass} students={students} />}
              />
              <Route path="/classes/:id/pairs"
                render={() => <PairDesksContainer klass={klass} students={students} />}
              />
              <Route path="/classes/:id/groups"
                render={() => <GroupDesksContainer klass={klass} students={students} />}
              />
            </Switch>
          </div>
        </div>
      </DndProvider>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    currentGrouping: state.currentKlass.grouping
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass)),
    dynamicPairs: klass => dispatch(dynamicPairs(klass)),
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesShowContainer)
