import React from 'react'

import PeriodicTableContainer from '../PeriodicTableContainer'
import Logo from '../Logo'

import {app} from './style'

const App = ({children}) => (
  <section className={app}>
    <Logo />
    <PeriodicTableContainer />
    {children}
  </section>
)

export default App
