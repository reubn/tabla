import React from 'react'
import classnames from 'classnames'

import {shell, nucleus, nucleusText,
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

const Diagram = ({element: {symbol, groupBlock}}) => (
  <svg viewBox="-1400 -1400 2800 2800">
    <circle r="225" className={classnames(nucleus, groupColours[groupBlock] || unknown)} />
    <text className={nucleusText}>
      {symbol}
    </text>
    <circle r="350" className={shell} />
    <circle r="500" className={shell} />
    <circle r="650" className={shell} />
    <circle r="800" className={shell} />
    <circle r="950" className={shell} />
    <circle r="1100" className={shell} />
    <circle r="1250" className={shell} />
  </svg>
)

export default Diagram
