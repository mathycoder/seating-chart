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

    default:
      return state;
  }
}

function allStudents(state = [], action) {

  switch(action.type) {
    case 'FETCH_STUDENTS':
      return [ ...action.students.map(student => `student${student.id}`)]

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
      behaviorScore: student.behavior_score
    }
  })
  return normalizedObj
}
