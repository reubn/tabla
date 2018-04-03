import React from 'react'
import sigdig from 'sigdig'

import ElectronicConfigurationFormat from '../formats/ElectronicConfiguration'

import ElectronicDiagramLens from './ElectronicDiagram'
import FigureLens from './Figure'
import TextLens from './Text'
import IonisationEnergiesLens from './IonisationEnergies'

const lenses = [
  ElectronicDiagramLens,
  {
    Lens: FigureLens,
    test: element => !!element.electronicConfigurationRaw,
    props: element => ({
      figures: [{
        label: 'Electronic Configuration',
        test: !!element.electronicConfigurationRaw,
        value: <ElectronicConfigurationFormat element={element} />
      }]
    })
  },
  {
    Lens: FigureLens,
    test: element => !!element.meltingPoint || !!element.boilingPoint || !!element.density,
    props: element => ({
      figures: [{
        label: 'Melting Point',
        test: !!element.meltingPoint,
        value: sigdig(element.meltingPoint - 273, 5),
        units: {
          super: true,
          text: '°C'
        }
      },
      {
        label: 'Boiling Point',
        test: !!element.boilingPoint,
        value: sigdig(element.boilingPoint - 273, 5),
        units: {
          super: true,
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
  },
  {
    Lens: FigureLens,
    test: element => !!element.covalentRadius || !!element.covalentRadiusDouble || !!element.covalentRadiusTriple,
    props: element => ({
      figures: [{
        label: 'Covalent Radius',
        test: !!element.covalentRadius,
        value: sigdig(element.covalentRadius, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      },
      {
        label: 'Double',
        test: !!element.covalentRadiusDouble,
        value: sigdig(element.covalentRadiusDouble, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      },
      {
        label: 'Triple',
        test: !!element.covalentRadiusTriple,
        value: sigdig(element.covalentRadiusTriple, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      }]
    })
  },
  IonisationEnergiesLens
]

export default element => lenses.reduce((active, lensOrFactory, index) => {
  let Lens = lensOrFactory.Lens ? lensOrFactory.Lens : lensOrFactory

  return lensOrFactory.test(element) ? [...active, <Lens element={element} key={index} {...(lensOrFactory.props ? lensOrFactory.props(element) : {})}/>] : active
}, [])
