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
    test: element => element.ionisationEnergies,
    formats: [element => ({title: 'Ionisation Energies', content: `${element.ionisationEnergies.join(', ')}kJ mol⁻¹`})]
  },
  {
    test: element => element.keyIsotopes,
    formats: [element => ({title: 'Key Isotopes', content: element.keyIsotopes.length ? element.keyIsotopes.join(', ') : element.keyIsotopes})]
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
      element => ({title: 'Melting Point', content: `${sigdig((element.meltingPoint * 1.8) - 459.67, 4)} °F`}),
      element => ({title: 'Melting Point', content: `${sigdig(element.meltingPoint, 4)} K`})
    ]
  },
  {
    test: element => element.boilingPoint,
    formats: [
      element => ({title: 'Boiling Point', content: `${sigdig(element.boilingPoint - 273, 4)} °C`}),
      element => ({title: 'Boiling Point', content: `${sigdig((element.boilingPoint * 1.8) - 459.67, 4)} °F`}),
      element => ({title: 'Boiling Point', content: `${sigdig(element.boilingPoint, 4)} K`})
    ]
  },
  {
    test: element => element.appearance,
    formats: [element => ({title: 'Appearance', content: element.appearance})]
  },
  {
    test: element => element.groupBlockFormatted,
    formats: [element => ({title: 'Group Block', content: element.groupBlockFormatted})]
  },
  {
    test: element => element.group,
    formats: [element => ({title: 'Group', content: element.group})]
  },
  {
    test: element => element.period,
    formats: [element => ({title: 'Period', content: element.period})]
  },
  {
    test: element => element.block,
    formats: [element => ({title: 'Block', content: element.block})]
  },
  {
    test: element => element.stateAt20c,
    formats: [element => ({title: 'State at 20°C', content: element.stateAt20c})]
  },
  {
    test: element => element.uses,
    formats: [element => ({title: 'Uses', content: element.uses})]
  },
  {
    test: element => element.history,
    formats: [element => ({title: 'History', content: element.history})]
  },
  {
    test: element => element.biologicalRole,
    formats: [element => ({title: 'Biological Role', content: element.biologicalRole})]
  },
  {
    test: element => element.naturalAbundance,
    formats: [element => ({title: 'Abundance', content: element.naturalAbundance})]
  },
  {
    test: element => element.electronAffinity,
    formats: [element => ({title: 'Electron Affinity', content: `${sigdig(element.electronAffinity, 4)} kJ mol⁻¹`})]
  },
  {
    test: element => element.atomicRadius,
    formats: [element => ({title: 'Atomic Radius', content: `${sigdig(element.atomicRadius, 4)} Å`})]
  },
  {
    test: element => element.covalentRadius,
    formats: [element => ({title: 'Covalent Radius', content: `${sigdig(element.covalentRadius, 4)} Å`})]
  },
  {
    test: element => element.cas,
    formats: [element => ({title: 'CAS', content: element.cas})]
  }
].map((scheme, index) => ({...scheme, id: index}))

export default schemes
