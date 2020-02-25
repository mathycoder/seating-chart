import { combineReducers } from 'redux'

const studentsReducer = combineReducers({
  byId: studentsById,
  allIds: allStudents
})

export default studentsReducer

function studentsById(state = {}, action) {

  switch(action.type) {

    case 'FETCH_STUDENTS':
      return {
        ...normalizedObject(action.students)
      }

    case 'ADD_STUDENT':
      return {
        ...state, ...normalizedObject([action.student])
      }

    case 'DELETE_STUDENT':
      const {[`student${action.student.id}`]: value, ...newState } = state
      return {
        ...newState
      }

    default:
      return state;
  }
}

function allStudents(state = [], action) {

  switch(action.type) {
    case 'FETCH_STUDENTS':
      return [ ...action.students.map(student => `student${student.id}`)]

    case 'ADD_STUDENT':
      return [...state, `student${action.student.id}`]

    case 'DELETE_STUDENT':
      return state.filter(stId => stId !== `student${action.student.id}`)

    default:
      return state;
  }
}

function normalizedObject(students){
  const normalizedObj= {}
  students.forEach(student => {
    normalizedObj[`student${student.id}`] = {
      firstName: student.first_name,
      lastName: student.last_name,
      academicScore: student.academic_score,
      behaviorScore: student.behavior_score,
      id: student.id
    }
  })
  return normalizedObj
}