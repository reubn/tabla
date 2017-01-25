import {createStore} from 'redux'

import reducers from './reducers'
import initials from './initials'

const store = createStore(reducers, initials)

export default store
