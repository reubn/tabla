import React from 'react'
import {Provider} from 'react-redux'

import {StaticRouter, Router} from 'react-router'

import App from './App'

export default ({store, history, staticRendering=typeof window !== 'object'}) => {
  const RouterComponent = staticRendering ? StaticRouter : Router

  return (
    <Provider store={store}>
      <RouterComponent history={history}>
        <App />
      </RouterComponent>
    </Provider>
  )
}
