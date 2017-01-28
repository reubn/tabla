import React from 'react'
import {Route} from 'react-router'

import App from './components/App'
import InfoContainer from './components/InfoContainer'

export default (
  <Route path="/" component={App}>
    <Route path="/:identifier" component={InfoContainer} />
  </Route>
)
