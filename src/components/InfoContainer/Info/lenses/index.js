import React from 'react'
import sigdig from 'sigdig'

import ElectronicLens from './Electronic'
import FigureLens from './Figure'
import TextLens from './Text'

const lenses = [
  ElectronicLens,
  {
    Lens: FigureLens,
    test: element => !!element.meltingPoint || !!element.boilingPoint || !!element.density,
    props: element => ({
      figures: [{
        label: 'Melting Point',
        test: !!element.meltingPoint,
        value: sigdig(element.meltingPoint - 273, 5),
        units: {
          sup: true,
          text: '°C'
        }
      },
      {
        label: 'Boiling Point',
        test: !!element.boilingPoint,
        value: sigdig(element.boilingPoint - 273, 5),
        units: {
          sup: true,
          text: '°C'
        }
      },
      {
        label: 'Density',
        test: !!element.density,
        value: sigdig(element.density, 5),
        units: {
          inline: true,
          text: 'g cm⁻³'
        }
      }]
    })
  },
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
