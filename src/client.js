/* global __BUILD__:true */

import React from 'react'
import {hydrate} from 'react-dom'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import Tabla from './components/Tabla'

window.build = __BUILD__

linkHistoryToStore(store)

hydrate(<Tabla store={store} history={history} />, document.getElementById('app'))
