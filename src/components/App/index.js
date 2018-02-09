import React from 'react'

import PeriodicTableContainer from '../PeriodicTableContainer'
import InfoContainer from '../InfoContainer'
import AboutContainer from '../AboutContainer'
import Link from '../Link'
import Logo from '../Logo'

import {app, logo} from './style'

const App = () => (
  <section className={app}>
    <Logo className={logo} />
    <PeriodicTableContainer />
    <InfoContainer />
    <AboutContainer />
  </section>
)

export default App
