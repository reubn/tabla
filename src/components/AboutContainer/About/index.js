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
    <p className={title}><a target="_blank" rel="noopener noreferrer" href="https://reuben.science">https://reuben.science</a></p>
    <p className={title}><a target="_blank" rel="noopener noreferrer" href="https://github.com/reubn/tabla">https://github.com/reubn/tabla</a></p>
    <hr />
    <span>Using data from <a target="_blank" rel="noopener noreferrer" href="https://bitbucket.org/lukaszmentel/mendeleev">mendeleev</a>.</span>
    <hr />
    <span>{licenceText}</span>
    <span className={build}>{typeof window === 'object' ? window.build : global.build}</span>
  </section>
)
