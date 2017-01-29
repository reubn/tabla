import React from 'react'
import classnames from 'classnames'

import Diagram from './Diagram'

import {info, open, header, data, name as nameStyle} from './style'

const Info = ({elementSelected, element={}, _: {name}=element}) => (
  <section className={classnames(info, {[open]: elementSelected})}>
    <header className={header}>
      <Diagram element={element} />
      <name className={nameStyle}>{name}</name>
    </header>
    <section className={data}></section>
  </section>
)

export default Info
