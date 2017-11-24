import React from 'react'
import sigdig from 'sigdig'

const schemes = [
  {
    test: element => element.electronicConfigurationRaw,
    formats: [
      element => ({title: 'Electronic Configuration', content: element.electronicConfiguration(false)}),
      element => ({title: 'Electronic Configuration Full', content: element.electronicConfiguration()}),
      element => ({title: 'Electrons Per Shell', content: element.electronsPerShell(true)})
    ]
  },
  {
    test: element => element.electronegativity,
    formats: [element => ({title: 'Electronegativity', content: element.electronegativity, unit: <span style={{fontVariantCaps: 'small-caps'}}>PAULING</span>})]
  },
  {
    test: element => element.oxidationStates && element.oxidationStates.length,
    formats: [element => ({title: 'Oxidation States', content: element.oxidationStates.join(', ')})]
  },
  {
    test: element => element.ionisationEnergies && element.ionisationEnergies.length,
    formats: [element => ({title: 'Ionisation Energies', content: element.ionisationEnergies.join(', '), unit: 'kJ mol⁻¹'})]
  },
  {
    test: element => element.keyIsotopes&& element.keyIsotopes.length,
    formats: [element => ({title: 'Key Isotopes', content: element.keyIsotopes.length ? element.keyIsotopes.join(', ') : element.keyIsotopes})]
  },
  {
    test: element => element.density,
    formats: [
      element => ({title: 'Density', content: sigdig(element.density * 1000, 4), unit: 'g dm⁻³'}),
      element => ({title: 'Density', content: sigdig(element.density, 4), unit: 'g cm⁻³'})
    ]
  },
  {
    test: element => element.meltingPoint,
    formats: [
      element => ({title: 'Melting Point', content: sigdig(element.meltingPoint - 273, 4), unit: '°C'}),
      element => ({title: 'Melting Point', content: sigdig((element.meltingPoint * 1.8) - 459.67, 4), unit: '°F'}),
      element => ({title: 'Melting Point', content: sigdig(element.meltingPoint, 4), unit: 'K'})
    ]
  },
  {
    test: element => element.boilingPoint,
    formats: [
      element => ({title: 'Boiling Point', content: sigdig(element.boilingPoint - 273, 4), unit: '°C'}),
      element => ({title: 'Boiling Point', content: sigdig((element.boilingPoint * 1.8) - 459.67, 4), unit: '°F'}),
      element => ({title: 'Boiling Point', content: sigdig(element.boilingPoint, 4), unit: 'K'})
    ]
  },
  {
    test: element => element.groupBlockFormatted,
    formats: [element => ({title: 'Group Block', content: element.groupBlockFormatted})]
  },
  {
    test: element => element.electronAffinity,
    formats: [element => ({title: 'Electron Affinity', content: sigdig(element.electronAffinity, 4), unit: 'kJ mol⁻¹'})]
  },
  {
    test: element => element.atomicRadius,
    formats: [element => ({title: 'Atomic Radius', content: sigdig(element.atomicRadius, 4), unit: 'Å'})]
  },
  {
    test: element => element.covalentRadius,
    formats: [element => ({title: 'Covalent Radius', content: sigdig(element.covalentRadius, 4), unit: 'Å'})]
  },
  {
    test: element => element.cas,
    formats: [element => ({title: 'CAS', content: <a style={{textDecoration: 'none', color: 'inherit'}} target="_blank" rel="noopener noreferrer" href={`http://www.chemspider.com/Search.aspx?q=${element.cas}`}>{element.cas}</a>})]
  }
].map((scheme, index) => ({...scheme, id: index}))

export default schemes
