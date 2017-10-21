import {applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import {history} from '../../routing/'
import urlSync from './urlSync'

export default compose(
  applyMiddleware(
    thunk,
    urlSync,
    routerMiddleware(history)
  ),
  typeof window === "object" && window.devToolsExtension ? window.devToolsExtension() : f => f
)
