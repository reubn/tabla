import React from 'react'
import classnames from 'classnames'

import {element as elementStyle, symbol as symbolStyle, atomicMass as atomicMassStyle, atomicNumber as atomicNumberStyle,
  alkaliMetal, halogen, nonMetal, transitionMetal, nobleGas, postTransitionMetal, metalloid, alkalineEarthMetal, actinoid, lanthanoid, unknown
} from './style'

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

const Element = ({element: {symbol, groupBlock, atomicMass, atomicNumber}, select}) => (
  <section className={classnames(elementStyle, groupColours[groupBlock] || unknown)} onClick={select}>
    <span className={atomicNumberStyle}>{atomicNumber}</span>
    <span className={symbolStyle}>{symbol}</span>
    <span className={atomicMassStyle}>{atomicMass.toPrecision(4)}</span>
  </section>
)

export default Element
