<<<<<<< HEAD
export default (dispatch, atomicNumber, triggerRedirect=true) => dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
=======
import {fullElement} from '../../elements'

export default async (dispatch, atomicNumber, triggerRedirect=true) => {
  if(typeof window !== 'object') return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})

  await fullElement(atomicNumber)
  return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
}
>>>>>>> origin/master
