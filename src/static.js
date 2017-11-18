import 'babel-polyfill'

import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

import asyncBootstrapper from 'react-async-bootstrapper'

import {collectInitial as collectStyles} from 'node-style-loader/collect' // eslint-disable-line import/no-extraneous-dependencies

import store from './store'
import {history, linkHistoryToStore} from './routing'

import Document from './components/Document'
import Root from './components/Root'

export default ({htmlWebpackPlugin: {files: {chunks}, options: {data: atomicNumber}}}) => {
  history.push(`/${atomicNumber||''}`)
  linkHistoryToStore(store)

  const styleTagString = collectStyles()
  const root = <Root store={store} />

  return asyncBootstrapper(root).then(() => {
    const renderedAppString = renderToString(root)
    const stateScriptString = `window.dryState = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`

    const documentString = renderToStaticMarkup(<Document chunks={chunks} styleTagString={styleTagString} renderedAppString={renderedAppString} stateScriptString={stateScriptString} />)

    return `<!DOCTYPE html> ${documentString}`
  })
}
