import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import periodicTable from './periodicTable'

const reducers = {
  routing: routerReducer,
  periodicTable
}

export default combineReducers(reducers)
