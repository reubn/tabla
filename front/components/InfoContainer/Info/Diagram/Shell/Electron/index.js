import React from 'react'

import {electron} from './style'

export default ({radius, angle, i}) => (
  <circle cx={radius * Math.sin(angle * i * (Math.PI / 180))} cy={-radius * Math.cos(angle * i * (Math.PI / 180))} className={electron} />
)
