import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

const index = ({htmlWebpackPlugin: {files: {chunks}}}) => (
  <html>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Tabla</title>
    <section id="app" />
    {Object.values(chunks).map(({entry}) => <script src={entry} />)}
  </html>
)

export default params => `<!DOCTYPE html> ${renderToStaticMarkup(index(params))}`
