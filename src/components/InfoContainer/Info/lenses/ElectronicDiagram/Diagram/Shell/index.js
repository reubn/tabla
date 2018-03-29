import React from 'react'

import Electron from './Electron'

import {shell as shellStyle, shellRing} from './style'

const Shell = ({shell, electrons}) => {
  const radius = 200 + (shell * 150)

  const electronAngle = 360 / electrons
  const electronElements = []
  for(let i = 0; i < electrons; i++) electronElements.push(<Electron key={i} radius={radius} angle={electronAngle} i={i} />)

  return (
    <g className={shellStyle}>
      <circle r={radius} className={shellRing} />
      {electronElements}
    </g>
  )
}

export default Shell
