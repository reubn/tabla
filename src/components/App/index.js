import React from 'react'

import PeriodicTableContainer from '../PeriodicTableContainer'
import InfoContainer from '../InfoContainer'
import Logo from '../Logo'

import {app} from './style'

const App = () => (
  <section className={app}>
    <Logo />
    <PeriodicTableContainer />
    <InfoContainer />
  </section>
)

export default App
