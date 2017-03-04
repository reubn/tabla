import React from 'react'
import classnames from 'classnames'

import Diagram from './Diagram'
import Data from './Data'

import {info, open, header, name as nameStyle, close as closeStyle} from './style'

const Info = ({elementSelected, close, element={}, _: {name, atomicNumber}=element}) => (
  <section className={classnames(info, {[open]: elementSelected})}>
    <header className={header}>
      <span className={closeStyle} onClick={close}>✕</span>
      <Diagram element={element} />
      <a href={`//en.wikipedia.org/wiki/Element_${atomicNumber}`} target="_blank" rel="noopener noreferrer" className={nameStyle}>{name}</a>
    </header>
    <Data element={element} />
  </section>
)

export default Info
