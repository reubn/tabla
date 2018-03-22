import groupBlocks from './groupBlocks.json'

export default ({ieData, isotopesData, oxidationStatesData}) => data => {
  return {
    an: data.atomic_number,
    n: data.name,
    s: data.symbol,
    am: data.atomic_weight,
    ec: data.electronic_configuration.split(' ').reduce((a, b) => {
      if(b.startsWith('[')) return [...a, b.replace(/\[|\]/g, '')]
      const split = b.replace(/(\D)/, '|$1|').split('|')
      return [...a, {sh: +split[0], su: split[1], e: +split[2]}]
      }, []),
    gb: groupBlocks[data.atomic_number],

    cas: data.cas,

    i: isotopesData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(iData => ({
      n: iData.mass_number - data.atomic_number,
      a: iData.abundance,
      r: iData.radioactive,
      hl: iData.half_life ? {
        t: iData.half_life,
        u: iData.half_life_unit
      } : undefined
    })),

    ies: ieData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(({degree, energy}) => [degree, energy]),
    os: oxidationStatesData.filter(({atomic_number}) => atomic_number === data.atomic_number).map(({oxidation_state}) => oxidation_state),

    g: data.group_id,
    p: data.period,
    b: data.block,

    bp: data.boiling_point,
    mp: data.melting_point,
    d: data.density,

    eh: data.evaporation_heat,
    fh: data.fusion_heat,
    sh: data.specific_heat,
    hof: data.heat_of_formation,
    tc: data.thermal_conductivity,

    ar: data.atomic_radius,
    av: data.atomic_volume,

    mr: data.metallic_radius,
    vdwr: data.vdw_radius,

    cr: data.covalent_radius_pyykko,
    crd: data.covalent_radius_pyykko_double,
    crt: data.covalent_radius_pyykko_triple,

    gbas: data.gas_basicity,

    dp: data.dipole_polarizability,
    ea: data.electron_affinity,
    pa: data.proton_affinity,

    en: data.en_pauling,

    lc: data.lattice_constant,
    ls: data.lattice_structure,

    c6: data.c6,

    r: data.radioactive,

    ca: data.abundance_crust,
    sa: data.abundance_sea,

    u: data.uses,
    sour: data.sources,
    desc: data.description,
    no: data.name_origin,

    disc: data.discoverers,
    discLoc: data.discovery_location,
    discYear: data.discovery_year,

    ann: data.annotation
  }
}
