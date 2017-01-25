import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import PeriodicTableContainer from './components/PeriodicTableContainer'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PeriodicTableContainer} />
  </Route>
)
