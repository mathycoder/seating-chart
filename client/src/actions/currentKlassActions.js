export function setCurrentKlass(klass){
  return {type: 'SET_CURRENT_KLASS', klass}
}

export function clearCurrentKlass(){
  return {type: 'CLEAR_CURRENT_KLASS'}
}
