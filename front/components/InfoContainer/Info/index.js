import React from 'react'
import classnames from 'classnames'

import {info, open} from './style'

const Info = ({elementSelected, element}) => (
  <section className={classnames(info, {[open]: elementSelected})}>{JSON.stringify(element, null, 2)}</section>
)

export default Info
