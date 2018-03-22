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

    this.isotopes = json.i.map(({n, a, r , hl:{t, u}={}}) => ({
      neutrons: n,
      abundance: a,
      radioactive: r,
      halfLife: t ? {time: t, unit: u} : undefined
    }))
  }
}

// eh: data.evaporation_heat,
// fh: data.fusion_heat,
// sph: data.specific_heat,
// hof: data.heat_of_formation,
// tc: data.thermal_conductivity,
// av: data.atomic_volume,
// mr: data.metallic_radius,
// vdwr: data.vdw_radius,
// crd: data.covalent_radius_pyykko_double,
// crt: data.covalent_radius_pyykko_triple,
// gbas: data.gas_basicity,
// dp: data.dipole_polarizability,
// pa: data.proton_affinity,
// lc: data.lattice_constant,
// ls: data.lattice_structure,
// c6: data.c6,
// r: data.radioactive,
// ca: data.abundance_crust,
// sa: data.abundance_sea,
// u: data.uses,
// sour: data.sources,
// desc: data.description,
// no: data.name_origin,
// disc: data.discoverers,
// discLoc: data.discovery_location,
// discYear: data.discovery_year,
// ann: data.annotation
