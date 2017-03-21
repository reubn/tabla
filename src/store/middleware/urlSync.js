import {matchPath} from 'react-router-dom'
import {LOCATION_CHANGE, push} from 'react-router-redux'

import selectElement from '../actions/selectElement'

let transitionID = Math.random()

export default ({dispatch}) => next => action => {
  if(action.type === 'SELECT_ELEMENT' && action.triggerRedirect){
    transitionID = Math.random()
    dispatch(push(`/${action.atomicNumber || ''}`, {transitionID}))
  }

  if(action.type === LOCATION_CHANGE && (!action.payload.state || action.payload.state.transitionID !== transitionID)){
    const {params: {atomicNumber}={}} = matchPath(action.payload.pathname, {path: '/:atomicNumber'}) || {}
    transitionID = Math.random()
    selectElement(dispatch, +atomicNumber || null, false)
  }

  return next(action)
}
