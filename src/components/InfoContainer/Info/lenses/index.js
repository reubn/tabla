import React from 'react'

import ElectronicLens from './Electronic'
import MeltBoilDensityLens from './MeltBoilDensity'

const lenses = [ElectronicLens, MeltBoilDensityLens]

export default element => lenses.reduce((active, Current) => Current.test(element) ? [...active, <Current element={element} key={Current.constructor.name} />] : active, [])
