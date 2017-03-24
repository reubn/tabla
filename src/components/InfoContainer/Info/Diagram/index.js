import React from 'react'

import Shell from './Shell'
import Nucleus from './Nucleus'

import {diagram} from './style'

const Diagram = ({element, _: {symbol}=element}) => (
  <svg className={diagram} viewBox="-1400 -1400 2800 2800">
    <Nucleus symbol={symbol} />
    {Object.entries(element.electronsPerShell()).map(([shell, electrons]) => <Shell key={shell} shell={shell} electrons={electrons} />)}
  </svg>
  )

export default Diagram
