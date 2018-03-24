import groupBlocks from './groupBlocks.json'

export default ({ieData, isotopesData, oxidationStatesData}) => data => ({
  // Atomic Number
  an: data.atomic_number,

  // Name
  n: data.name,

  // Symbol
  s: data.symbol,

  // Atomic Mass
  am: data.atomic_weight,

  // Electronic Configuration
  ec: data.electronic_configuration.split(' ').reduce((a, b) => {
    if(b.startsWith('[')) return [...a, b.replace(/\[|\]/g, '')]
    const split = b.replace(/(\D)/, '|$1|').split('|')
    return [...a, {sh: +split[0], su: split[1], e: +split[2] || 1}]
  }, []),

  // Group Block
  gb: groupBlocks[data.atomic_number],

  // Radioactive?
  r: data.radioactive,


  // CAS
  cas: data.cas,

  // Isotopes
  i: isotopesData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(iData => ({
    // Neutrons
    n: iData.mass_number - data.atomic_number,

    // Abundance
    a: iData.abundance,

    // Radioactive?
    r: iData.radioactive,

    // Half Life
    hl: iData.half_life ? {
      // Time
      t: iData.half_life,

      // Units
      u: iData.half_life_unit
    } : undefined
  })),


  // Ionisation Energies
  ies: ieData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(({degree, energy}) => [degree, energy]),

  // Oxidation States
  os: oxidationStatesData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(({oxidation_state}) => oxidation_state),

  // Group
  g: data.group_id,

  // Period
  p: data.period,

  // Block
  b: data.block,

  // Boiling Point
  bp: data.boiling_point,

  // Melting Point
  mp: data.melting_point,

  // Density
  d: data.density,

  // Evaporation Heat
  eh: data.evaporation_heat,

  // Fusion Heat
  fh: data.fusion_heat,

  // Specific Heat
  sph: data.specific_heat,

  // Heat of Formation
  hof: data.heat_of_formation,

  // Thermal Conductivity
  tc: data.thermal_conductivity,

  // Atomic Radius
  ar: data.atomic_radius,

  // Atomic Volume
  av: data.atomic_volume,

  // Metallic Radius
  mr: data.metallic_radius,

  // Van der Waals Radius
  vdwr: data.vdw_radius,

  // Covalent Radius
  cr: data.covalent_radius_pyykko,

  // Covalent Radius Double
  crd: data.covalent_radius_pyykko_double,

  // Covalent Radius Triple
  crt: data.covalent_radius_pyykko_triple,

  // Gas Basicity
  gbas: data.gas_basicity,

  // Dipole Polarisability
  dp: data.dipole_polarizability,

  // Electron Affinity
  ea: data.electron_affinity,

  // Proton Affinity
  pa: data.proton_affinity,


  // Electronegativity
  en: data.en_pauling,

  // Lattice Constant
  lc: data.lattice_constant,

  // Lattice Structure
  ls: data.lattice_structure,

  // Dispersion in Au
  c6: data.c6,

  // Abundance in Crust
  ca: data.abundance_crust,

  // Abundance in Sea
  sa: data.abundance_sea,

  // Uses
  u: data.uses,

  // Sources
  sour: data.sources,

  // Description
  desc: data.description,

  // Name Origin
  no: data.name_origin,

  // Discoverers
  disc: data.discoverers,

  // Disocvery Location
  discLoc: data.discovery_location,

  // Discovery Year
  discYear: data.discovery_year,

  // Annotations
  ann: data.annotation
})
