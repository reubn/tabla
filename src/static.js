import 'babel-polyfill'

import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'


import {collectInitial as collectStyles} from 'node-style-loader/collect' // eslint-disable-line import/no-extraneous-dependencies

import fullElements from '../data/dist/full'
import {FullElement} from './elements'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import Document from './components/Document'
import Root from './components/Root'

export default ({atomicNumber, webpackStats: {compilation: {assets}}}) => {
  const chunks = Object.keys(assets).filter(name => name !== 'static.js' && name.match(/\.js$/))

  history.push(`/${atomicNumber||''}`)
  linkHistoryToStore(store)

  const styleTagString = collectStyles()

  // HACK: Pass FullElement down for render
  global.fullElementHack = atomicNumber ? new FullElement(atomicNumber, fullElements[atomicNumber]) : {}

  const renderedAppString = renderToString(<Root store={store} />)
  const stateScriptString = `window.dryState = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`

  const documentString = renderToStaticMarkup(<Document chunks={chunks} styleTagString={styleTagString} renderedAppString={renderedAppString} stateScriptString={stateScriptString} />)

  console.log('⚡️', atomicNumber)
  return `<!DOCTYPE html> ${documentString}`
}
