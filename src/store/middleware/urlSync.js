import {matchPath} from 'react-router'
import {LOCATION_CHANGE, push} from 'react-router-redux'

let transitionID = Math.random()

export default routes => ({getState, dispatch}) => next => action => {
  if(action.type === LOCATION_CHANGE && (!action.payload.state || action.payload.state.transitionID !== transitionID)){
    const matchingRoute = routes.find(({path: p}) => (typeof p === 'function' ? p : pn => matchPath(pn, {path: p}))(action.payload.pathname))

    if(matchingRoute){
      const result = matchPath(action.payload.pathname, {path: matchingRoute.path})
      transitionID = Math.random()
      matchingRoute.actionCreator(getState, dispatch, result)
    }
  }

  const matchingRoute = routes.find(({action: a}) => (typeof a === 'function' ? a : ({type: t}) => t === a)(action))

  if(matchingRoute && action.triggerRedirect){
    transitionID = Math.random()
    dispatch(push(matchingRoute.pathCreator(action), {transitionID}))
  }

  return next(action)
}
