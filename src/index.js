import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

import {collectInitial as collectStyles} from 'node-style-loader/collect'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import Document from './components/Document'
import Tabla from './components/Tabla'

export default ({htmlWebpackPlugin: {files: {chunks}, options: {data: atomicNumber}}}) => {
  history.push(`/${atomicNumber}`)
  linkHistoryToStore(store)

  const styleTagString = collectStyles()
  const renderedAppString = renderToString(<Tabla store={store} history={history} />)
  const stateScriptString = `window.preRenderedState = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`

  const documentString = renderToStaticMarkup(<Document chunks={chunks} styleTagString={styleTagString} renderedAppString={renderedAppString} stateScriptString={stateScriptString} />)

  return `<!DOCTYPE html> ${documentString}`
}
