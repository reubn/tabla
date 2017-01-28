import inital from '../initials/periodicTable'

export default (state=inital, action) => {
  if(action.type === 'SELECT_ELEMENT') return {...state, selectedElement: action.atomicNumber}
  return state
}
