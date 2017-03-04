/* global __BUILD__:true */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import store from './store'
import routes from './routes'


function Tabla(){
  this.build = __BUILD__
  this.store = store
  this.history = syncHistoryWithStore(browserHistory, this.store)

  render(
    <Provider store={this.store}>
      <Router history={this.history} routes={routes} />
    </Provider>, document.getElementById('app'))

  if(process.env.NODE_ENV === 'development') console.log(this, this.build)

  return this
}

window.tabla = new Tabla()
