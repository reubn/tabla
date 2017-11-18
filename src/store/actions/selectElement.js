import {fullElement} from '../../elements'

export default async (dispatch, atomicNumber, triggerRedirect=true) => {
  await fullElement(atomicNumber)
  return dispatch({type: 'SELECT_ELEMENT', triggerRedirect, atomicNumber})
}
