import { combineReducers } from 'redux'

const currentKlassReducer = combineReducers({
  klass: currentKlass,
  grouping: currentGrouping
})


function currentKlass(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_KLASS':
      return {
        ...action.klass
      }

    case 'CLEAR_CURRENT_KLASS':
      return null

    default:
      return state;
  }
}

function currentGrouping(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_GROUP':
      return action.group

    case 'CLEAR_CURRENT_KLASS':
      return null

    default:
      return state;
  }
}

export default currentKlassReducer
