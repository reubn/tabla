import React from 'react'

import PeriodicTableContainer from '../PeriodicTableContainer'

import {app} from './style'

const App = ({children}) => (
  <section className={app}>
    <PeriodicTableContainer />
    {children}
  </section>
)

export default App
