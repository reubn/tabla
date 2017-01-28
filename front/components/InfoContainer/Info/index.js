import React from 'react'
import classnames from 'classnames'

import {info, open} from './style'

const Info = ({elementSelected}) => (
  <section className={classnames(info, {[open]: elementSelected})}></section>
)

export default Info
