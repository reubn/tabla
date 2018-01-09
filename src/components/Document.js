/* eslint react/no-danger: 0 */
import React from 'react'

export default ({styleTagString, renderedAppString, continuityScriptString, chunks}) => (
  <html lang="en">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Tabla</title>
    <p dangerouslySetInnerHTML={{__html: styleTagString}} />
    <section id="app" dangerouslySetInnerHTML={{__html: renderedAppString}} />
    <script dangerouslySetInnerHTML={{__html: continuityScriptString}} />
    {Object.values(chunks).map(entry => <script key={entry} src={entry} />)}
  </html>
)
