import React from 'react'
import classnames from 'classnames'

import {nucleus, nucleusText,
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

const Nucleus = ({groupBlock, symbol}) => (
  <g>
    <circle r="225" className={classnames(nucleus, groupColours[groupBlock] || unknown)} />
    <text className={nucleusText}>
      {symbol}
    </text>
  </g>
  )

export default Nucleus
