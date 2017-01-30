import React from 'react'

import Shell from './Shell'
import Nucleus from './Nucleus'

const Diagram = ({element, _: {symbol, groupBlock}=element}) => (
  <svg viewBox="-1400 -1400 2800 2800">
    <Nucleus symbol={symbol} groupBlock={groupBlock} />
    {Object.entries(element.electronDiagram()).map(([shell, electrons]) => <Shell shell={shell} electrons={electrons} />)}
  </svg>
  )

export default Diagram
