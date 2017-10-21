import React from 'react'
import {CSSTransition} from 'react-transition-group'
import classnames from 'classnames'


import Diagram from './Diagram'
import Data from './Data'

import {info, open, header, name as nameStyle, close as closeStyle, enter, enterActive, exit, exitActive, appear, appearActive,
  alkaliMetal, halogen, nonMetal, transitionMetal, nobleGas, postTransitionMetal, metalloid, alkalineEarthMetal, actinoid, lanthanoid, unknown} from './style'

const groupColours = {
  alkaliMetal,
  halogen,
  nonMetal,
  transitionMetal,
  nobleGas,
  postTransitionMetal,
  metalloid,
  alkalineEarthMetal,
  actinoid,
  lanthanoid,
  unknown
}

const Info = ({elementSelected, close, element={}, _: {name, atomicNumber, groupBlock}=element}) => (
  <CSSTransition
    in={elementSelected}
    classNames={{enter, enterActive, exit, exitActive, appear, appearActive}}
    timeout={200}
  >
    <section className={classnames(info, {[open]: elementSelected}, groupColours[groupBlock] || unknown)}>
      <header className={header}>
        <span className={closeStyle} onClick={close}>✕</span>
        {elementSelected && <Diagram element={element} />}
        <a href={`//en.wikipedia.org/wiki/Element_${atomicNumber}`} target="_blank" rel="noopener noreferrer" className={nameStyle}>{name}</a>
      </header>
      <Data element={element} />
    </section>
  </CSSTransition>
)

export default Info
