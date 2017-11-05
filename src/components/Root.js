import React from 'react'
import {Provider} from 'react-redux'

import App from './App'

export default ({store}) => (
  <Provider store={store}>
    <App />
  </Provider>
)
