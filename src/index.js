import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {Provider} from 'react-redux'

import {StaticRouter} from 'react-router'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import App from './components/App'

function index({htmlWebpackPlugin: {files: {chunks}}}){
  linkHistoryToStore(store)

  return (
    <html>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <title>Tabla</title>
      {global.__universal__.reactStyles}
      <section id="app">
    <Provider store={store}>
      <StaticRouter history={history}>
        <App />
      </StaticRouter>
    </Provider>
    </section>
    {Object.values(chunks).map(({entry}) => <script src={entry} />)}
  </html>
    )
}

export default params => `<!DOCTYPE html> ${renderToStaticMarkup(index(params))}`
