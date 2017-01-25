import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import store from './store'
import routes from './routes'


function Tabla(){
  this.store = store
  this.history = syncHistoryWithStore(browserHistory, this.store)

  render(
    <Provider store={this.store}>
      <Router history={this.history} routes={routes} />
    </Provider>, document.getElementById('app'))
  return this
}

window.tabla = new Tabla()
