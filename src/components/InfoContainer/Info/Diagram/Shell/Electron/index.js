import React from 'react'

import {electron} from './style'

const Electron = ({radius, angle, i}) => (
  <circle cx={(radius * Math.sin(angle * i * (Math.PI / 180))).toFixed(2)} cy={(-radius * Math.cos(angle * i * (Math.PI / 180))).toFixed(2)} className={electron} style={{transitionDelay: `${0.01 * i}s`}} />
)

export default Electron
