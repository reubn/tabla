import BasicElement from './BasicElement'

export default class FullElement extends BasicElement {
  constructor(atomicNumber, json){
    super(atomicNumber, json)

    this.group = json.g
    this.period = json.p
    this.block = json.b
    this.uses = json.u
    this.ionisationEnergies = json.ies
    this.cas = json.cas
    this.oxidationStates = json.os
    this.meltingPoint = json.mp
    this.boilingPoint = json.bp
    this.density = json.d

    this.evaporationHeat = json.eh
    this.fusionHeat = json.fh
    this.specificHeat = json.sph
    this.heatOfFormation = json.hof
    this.thermalConductivity = json.tc
    this.atomicRadius = json.ar
    this.atomicVolume = json.av
    this.metallicRadius = json.mr
    this.vanDerWaalsRadius = json.vdwr
    this.covalentRadius = json.cr
    this.covalentRadiusDouble = json.crd
    this.covalentRadiusTriple = json.crt
    this.gasBasicity = json.gbas
    this.dipolePolarisability = json.dp
    this.electronAffinity = json.ea
    this.protonAffinity = json.pa
    this.electronegativity = json.en
    this.latticeConstant = json.lc
    this.latticeStructure = json.ls
    this.c6 = json.c6

    this.uses = json.u
    this.sources = json.sour
    this.description = json.desc
    this.nameOrigin = json.no
    this.discoverers = json.disc
    this.discoveryLocation = json.discLoc
    this.discoveryYear = json.discYear

    this.annotations = json.ann

    this.abundance = (json.ca || json.sa) ? {
      crust: json.ca,
      sea: json.sa
    } : undefined

    this.isotopes = json.i ? json.i.map(({n, a, r, hl: {t, u}={}}) => ({
      neutrons: n,
      abundance: a,
      radioactive: r,
      halfLife: t ? {time: t, unit: u} : undefined
    })) : undefined
  }
}
