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
  },
  {
    test: element => element.meltingPoint,
    formats: [
      element => ({title: 'Melting Point', content: `${sigdig(element.meltingPoint - 273, 4)} °C`}),
      element => ({title: 'Melting Point', content: `${sigdig((element.meltingPoint * (9/5)) - 459.67, 4)} °F`}),
      element => ({title: 'Melting Point', content: `${sigdig(element.meltingPoint, 4)} K`})
    ]
  },
  {
    test: element => element.boilingPoint,
    formats: [
      element => ({title: 'Boiling Point', content: `${sigdig(element.boilingPoint - 273, 4)} °C`}),
      element => ({title: 'Boiling Point', content: `${sigdig((element.boilingPoint * (9/5)) - 459.67, 4)} °F`}),
      element => ({title: 'Boiling Point', content: `${sigdig(element.boilingPoint, 4)} K`})
    ]
  },
  {
    test: element => element.atomicRadius,
    formats: [element => ({title: 'Atomic Radius', content: `${sigdig(element.atomicRadius, 4)} m⁻¹²`})]
  },
  {
    test: element => element.bondingType,
    formats: [element => ({title: 'Bonding Type', content: element.bondingType})]
  },
  {
    test: element => element.groupBlock,
    formats: [element => ({title: 'Group Block', content: element.groupBlock})]
  },
  {
    test: element => element.namedBy,
    formats: [element => ({title: 'Named By', content: element.namedBy})]
  },
  {
    test: element => element.discoveredBy,
    formats: [element => ({title: 'Discovered By', content: element.discoveredBy})]
  },
  {
    test: element => element.yearDiscovered,
    formats: [element => ({title: 'Year Discovered', content: element.yearDiscovered})]
  }
]

export default schemes
