function selectElementAction(dispatch, atomicNumber, redirect=true){
  return dispatch({type: 'SELECT_ELEMENT', redirect, atomicNumber})
}

export default selectElementAction
