import {push} from 'react-router-redux'

function selectElementAction(dispatch, atomicNumber, redirect=true){
  console.log(...arguments)
  dispatch({type: 'SELECT_ELEMENT', atomicNumber})
  if(redirect) return dispatch(push(`/${atomicNumber}`))
}

export default selectElementAction
