function selectElementAction(dispatch, atomicNumber, triggerRedirect=true){
  return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
}

export default selectElementAction
