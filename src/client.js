import React from 'react'
import {hydrate} from 'react-dom'

import store from './store'
import {linkHistoryToStore} from './routing'

import Root from './components/Root'

linkHistoryToStore(store)

hydrate(<Root store={store} />, document.getElementById('app'))
