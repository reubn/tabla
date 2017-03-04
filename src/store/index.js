import {createStore} from 'redux'

import reducers from './reducers'
import initials from './initials'
import middleware from './middleware'

const store = createStore(reducers, initials, middleware)

export default store
