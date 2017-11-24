export default (dispatch, atomicNumber, triggerRedirect=true) => dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
