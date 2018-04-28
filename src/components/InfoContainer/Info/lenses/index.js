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
    test: element => element.electronicConfigurationRaw,
    props: element => ({
      figures: [{
        label: 'Electronic Configuration',
        test: element.electronicConfigurationRaw,
        value: <ElectronicConfigurationFormat element={element} />
      }]
    })
  },
  {
    Lens: FigureLens,
    test: element => element.meltingPoint || element.boilingPoint || element.density,
    props: element => ({
      figures: [{
        label: 'Melting Point',
        test: element.meltingPoint,
        value: sigdig(element.meltingPoint - 273, 5),
        units: {
          super: true,
          text: '°C'
        }
      },
      {
        label: 'Boiling Point',
        test: element.boilingPoint,
        value: sigdig(element.boilingPoint - 273, 5),
        units: {
          super: true,
          text: '°C'
        }
      },
      {
        label: 'Density',
        test: element.density,
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
    test: element => element.description,
    props: element => ({
      label: 'Description',
      text: element.description
    })
  },
  {
    Lens: FigureLens,
    test: element => element.covalentRadius || element.covalentRadiusDouble || element.covalentRadiusTriple,
    props: element => ({
      figures: [{
        label: 'Covalent Radius',
        test: element.covalentRadius,
        value: sigdig(element.covalentRadius, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      },
      {
        label: 'Double',
        test: element.covalentRadiusDouble,
        value: sigdig(element.covalentRadiusDouble, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      },
      {
        label: 'Triple',
        test: element.covalentRadiusTriple,
        value: sigdig(element.covalentRadiusTriple, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      }]
    })
  },
  IonisationEnergiesLens,
  {
    Lens: FigureLens,
    test: element => element.oxidationStates,
    props: element => ({
      figures: [{
        label: 'Oxidation States',
        test: true,
        value: element.oxidationStates.map(n => n > 0 ? `+${n}` : n).join(', ')
      }]
    })
  },
  {
    Lens: TextLens,
    test: element => element.uses,
    props: element => ({
      label: 'Uses',
      text: element.uses
    })
  },
  {
    Lens: FigureLens,
    test: element => element.electronAffinity || element.protonAffinity || element.electronegativity,
    props: element => ({
      figures: [{
        label: 'Electron Affinity',
        test: element.electronAffinity,
        value: sigdig((element.electronAffinity * 96485.3328959) / 1000, 5),
        units: {
          inline: true,
          text: 'kJ mol⁻¹'
        }
      },
      {
        label: 'Proton Affinity',
        test: element.protonAffinity,
        value: sigdig(element.protonAffinity, 5),
        units: {
          inline: true,
          text: 'kJ mol⁻¹'
        }
      },
      {
        label: 'Electronegativity',
        test: element.electronegativity,
        value: element.electronegativity,
        units: {
          inline: true,
          text: 'PAULING'
        }
      }]
    })
  },
  {
    Lens: FigureLens,
    test: element => element.atomicVolume || element.atomicRadius,
    props: element => ({
      figures: [{
        label: 'Atomic Volume',
        test: element.atomicVolume,
        value: sigdig(element.atomicVolume, 5),
        units: {
          inline: true,
          text: 'cm³ mol⁻¹'
        }
      },
      {
        label: 'Atomic Radius',
        test: element.atomicRadius,
        value: sigdig(element.atomicRadius, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      }]
    })
  },
  {
    Lens: FigureLens,
    test: element => element.metallicRadius || element.vanDerWaalsRadius,
    props: element => ({
      figures: [{
        label: 'Metallic Radius',
        test: element.metallicRadius,
        value: sigdig(element.metallicRadius, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      },
      {
        label: 'Van Der Waals Radius',
        test: element.vanDerWaalsRadius,
        value: sigdig(element.vanDerWaalsRadius, 5),
        units: {
          inline: true,
          text: 'pm'
        }
      }]
    })
  },
  {
    Lens: TextLens,
    test: element => element.sources,
    props: element => ({
      label: 'Sources',
      text: element.sources
    })
  },
  {
    Lens: TextLens,
    test: element => element.discoveryYear || element.discoverers || element.discoveryLocation,
    props: element => ({
      label: 'Discovery',
      text: `Discovered ${element.discoveryYear ? `in ${element.discoveryYear} ` : ''}${element.discoverers? `by ${element.discoverers} ` : ''}${element.discoveryLocation ? `in ${element.discoveryLocation}` : ''}`
    })
  },
  {
    Lens: TextLens,
    test: element => element.nameOrigin,
    props: element => ({
      label: 'Name Origin',
      text: element.nameOrigin
    })
  },
  }
]

export default element => lenses.reduce((active, lensOrFactory, index) => {
  let Lens = lensOrFactory.Lens ? lensOrFactory.Lens : lensOrFactory

  return lensOrFactory.test(element) ? [...active, <Lens element={element} key={index} {...(lensOrFactory.props ? lensOrFactory.props(element) : {})}/>] : active
}, [])
