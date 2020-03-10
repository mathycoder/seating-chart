function currentKlassReducer(state = null, action) {

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

export default currentKlassReducer
