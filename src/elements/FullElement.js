import BasicElement from './BasicElement'

export default class FullElement extends BasicElement {
  constructor(atomicNumber, json){
    super(atomicNumber, json)

    this.group = json.g
    this.period = json.p
    this.block = json.b
    this.uses = json.u
    this.electronAffinity = json.ea
    this.covalentRadius = json.cr
    this.ionisationEnergies = json.ies
    this.cas = json.cas
    this.electronegativity = json.en
    this.atomicRadius = json.ar
    this.oxidationStates = json.os
    this.meltingPoint = json.mp
    this.boilingPoint = json.bp
    this.density = json.dp

    this.isotopes = json.i ? json.i.map(({n, a, r, hl: {t, u}={}}) => ({
      neutrons: n,
      abundance: a,
      radioactive: r,
      halfLife: t ? {time: t, unit: u} : undefined
    })) : undefined
  }
}
