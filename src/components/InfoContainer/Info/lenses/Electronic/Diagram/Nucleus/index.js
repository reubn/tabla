import React from 'react'

import {nucleus, nucleusText} from './style'

const Nucleus = ({symbol}) => (
  <g>
    <circle r="225" className={nucleus} />
    <text className={nucleusText}>
      {symbol}
    </text>
  </g>
)

export default Nucleus
