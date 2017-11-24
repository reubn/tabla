import BasicElement from './BasicElement'

export default class FullElement extends BasicElement {
  constructor(atomicNumber, json){
    super(atomicNumber, {
      name: json.name,
      symbol: json.symbol,
      atomicMass: json.atomicMass,
      electronicConfiguration: json.electronicConfiguration,
      groupBlock: json.groupBlock
    })

    this.group = json.group
    this.period = json.period
    this.block = json.block
    this.stateAt20c = json.stateAt20c
    this.uses = json.uses
    this.biologicalRole = json.biologicalRole
    this.naturalAbundance = json.naturalAbundance
    this.electronAffinity = json.electronAffinity
    this.covalentRadius = json.covalentRadius
    this.history = json.history
    this.keyIsotopes = json.keyIsotopes
    this.ionisationEnergies = json.ionisationEnergies
    this.cas = json.cas
    this.electronegativity = json.electronegativity
    this.atomicRadius = json.atomicRadius
    this.oxidationStates = json.oxidationStates
    this.meltingPoint = json.meltingPoint
    this.boilingPoint = json.boilingPoint
    this.density = json.density
    this.appearance = json.appearance
  }
}
