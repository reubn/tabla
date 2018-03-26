import React from 'react'

import ElectronicLens from './Electronic'
import MeltBoilDensityLens from './MeltBoilDensity'
import TextLens from './Text'

const lenses = [
  ElectronicLens,
  MeltBoilDensityLens,
  {
    Lens: TextLens,
    test: element => !!element.description,
    props: element => ({
      label: 'Description',
      text: element.description
    })
  }
]

export default element => lenses.reduce((active, Current, index) => Current.test(element) ? [...active, <Current element={element} key={index} />] : active, [])
