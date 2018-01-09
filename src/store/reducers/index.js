import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import periodicTable from './periodicTable'
import about from './about'

const reducers = {
  routing: routerReducer,
  periodicTable,
  about
}

export default combineReducers(reducers)
