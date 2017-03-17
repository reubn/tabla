/* global __BUILD__:true */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {Router} from 'react-router-dom'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import App from './components/App'

function Tabla(){
  this.build = __BUILD__

  linkHistoryToStore(store)

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>, document.getElementById('app'))

  if(process.env.NODE_ENV === 'development') console.log(this, this.build)

  return this
}

window.tabla = new Tabla()
