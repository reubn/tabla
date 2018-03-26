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

export default element => lenses.reduce((active, lensOrFactory, index) => {
  let Lens = lensOrFactory.Lens ? lensOrFactory.Lens : lensOrFactory

  return lensOrFactory.test(element) ? [...active, <Lens element={element} key={index} {...(lensOrFactory.props ? lensOrFactory.props(element) : {})}/>] : active
}, [])
