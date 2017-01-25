import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import table from './table'

const reducers = {
  routing: routerReducer,
  table
}

export default combineReducers(reducers)
