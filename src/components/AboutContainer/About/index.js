import React from 'react'
import classnames from 'classnames'

import Close from '../../Close'
import Logo from '../../Logo'

import {about, open, logo, build} from './style'

export default ({visible, close}) => (
  <section className={classnames(about, {[open]: visible})}>
    <Close onClick={close} />
    <Logo className={logo} light/>
    <span className={build}>{typeof window === 'object' ? window.build : global.build}</span>
  </section>
)
