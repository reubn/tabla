import {matchPath} from 'react-router-dom'
import {LOCATION_CHANGE, push} from 'react-router-redux'

import selectElement from '../actions/selectElement'

// Set new random ID for page load transition
let transitionID = Math.random()

export default ({dispatch}) => next => action => {
  if(action.type === 'SELECT_ELEMENT' && action.redirect){
    transitionID = Math.random()

    dispatch(push(`/${action.atomicNumber || ''}`, {redirect: false, transitionID}))
    return next(action)
  }

  if(action.type === LOCATION_CHANGE && (!action.payload.state || action.payload.state.redirect || action.payload.state.transitionID !== transitionID)){
    const {params: {atomicNumber}={}} = matchPath(action.payload.pathname, {path: '/:atomicNumber'}) || {}

    if(atomicNumber) selectElement(dispatch, +atomicNumber, false)
    return next(action)
  }

  return next(action)
}
