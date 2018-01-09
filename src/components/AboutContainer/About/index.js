import React from 'react'
import classnames from 'classnames'

import Logo from '../../Logo'

import {about, open} from './style'

export default ({visible}) => (
  <section className={classnames(about, {[open]: visible})}><Logo light/></section>
)
