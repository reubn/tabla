import {applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import {history, routes} from '../../routing'
import urlSync from './urlSync'

export default compose(
  applyMiddleware(
    thunk,
    urlSync(routes),
    routerMiddleware(history)
  ),
  typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension() : f => f
)
