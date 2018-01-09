import React from 'react'

import PeriodicTableContainer from '../PeriodicTableContainer'
import InfoContainer from '../InfoContainer'
import AboutContainer from '../AboutContainer'
import Logo from '../Logo'

import {app} from './style'

const App = () => (
  <section className={app}>
    <Logo />
    <PeriodicTableContainer />
    <InfoContainer />
    <AboutContainer />
  </section>
)

export default App
