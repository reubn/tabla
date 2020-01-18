import React from 'react'

import Shell from './Shell'
import Nucleus from './Nucleus'

import {diagram} from './style'

const Diagram = ({element, _: {symbol}=element}) => (
  <svg className={diagram} viewBox="-1300 -1300 2600 2600">
    <Nucleus symbol={symbol} />
    {element.electronsPerShell && Object.entries(element.electronsPerShell()).map(([shell, electrons], _, {length}) => <Shell key={shell} shell={shell} totalShells={length} electrons={electrons} />)}
  </svg>
)

export default Diagram
