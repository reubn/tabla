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
    formats: [element => ({title: 'Electronegativity', content: element.electronegativity})]
  },
  {
    test: element => element.oxidationStates,
    formats: [element => ({title: 'Oxidation States', content: element.oxidationStates.join(', ')})]
  },
  {
    test: element => element.density,
    formats: [
      element => ({title: 'Density', content: `${sigdig(element.density * 1000, 4)} g dm⁻³`}),
      element => ({title: 'Density', content: `${sigdig(element.density, 4)} g cm⁻³`})
    ]
  }
]

export default schemes


/*
this.atomicRadius = atomicRadius
this.bondingType = bondingType
this.meltingPoint = meltingPoint
this.boilingPoint = boilingPoint
this.density = density
this.groupBlock = groupBlock
this.namedBy = namedBy
this.yearDiscovered = yearDiscovered
this.discoveredBy = discoveredBy
*/
