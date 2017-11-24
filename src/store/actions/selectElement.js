import {fullElement} from '../../elements'

export default async (dispatch, atomicNumber, triggerRedirect=true) => {
  if(typeof window !== 'object') return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})

  await fullElement(atomicNumber)
  return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
}
