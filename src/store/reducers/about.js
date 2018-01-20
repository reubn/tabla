import inital from '../initials/about'

export default (state=inital, action) => {
  if(action.type === 'TOGGLE_ABOUT') return !!action.payload

  return state
}
