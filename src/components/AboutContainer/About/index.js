import React from 'react'
import classnames from 'classnames'

import licenceText from 'raw-loader!../../../../LICENSE'

import Close from '../../Close'
import Logo from '../../Logo'
import Link from '../../Link'

import {about, open, logo, build, title} from './style'

export default ({visible, close}) => (
  <section className={classnames(about, {[open]: visible})}>
    <Close onClick={close} />
    <Logo className={logo} light/>
    <p className={title}>A project by <a target="_blank" rel="noopener noreferrer" href="https://reuben.science">Reuben</a></p>
    <hr />
    <span>Using data from <a target="_blank" rel="noopener noreferrer" href="https://bitbucket.org/lukaszmentel/mendeleev">mendeleev</a>.</span>
    <span>{licenceText}</span>
    <span className={build}>{typeof window === 'object' ? window.build : global.build}</span>
  </section>
)
