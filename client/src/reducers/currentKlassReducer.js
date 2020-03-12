import { combineReducers } from 'redux'

const currentKlassReducer = combineReducers({
  klass: currentKlass,
  grouping: currentGrouping,
  ratings: showRatings
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

function showRatings(state = false, action) {
  switch(action.type) {
    case 'SHOW_RATINGS':
      return true

    case 'HIDE_RATINGS':
      return false

    default:
      return state;
  }
}

export default currentKlassReducer
