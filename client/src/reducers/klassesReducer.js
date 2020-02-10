import { combineReducers } from 'redux'

const klassesReducer = combineReducers({
  byId: klassesById,
  allIds: allKlasses
})

export default klassesReducer

function klassesById(state = {}, action) {

  switch(action.type) {

    case 'FETCH_KLASSES':
      return {
        ...normalizedObject(action.klasses)
      }

    default:
      return state;
  }
}

function allKlasses(state = [], action) {

  switch(action.type) {
    case 'FETCH_KLASSES':
      return [
        ...action.klasses.map(klass => `klass${klass.id}`)
      ]

    default:
      return state;
  }
}

function normalizedObject(klasses){
  const normalizedObj= {}
  klasses.forEach(klass => {
    normalizedObj[`klass${klass.id}`] = klass
  })
  return normalizedObj
}
