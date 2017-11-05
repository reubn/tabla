import ssn from 'superscript-number'

import data from './raw'
import subshellOrder from './subshellOrder'

export class Element {
  constructor(atomicNumber, {name, symbol, atomicMass, electronicConfiguration, electronegativity, atomicRadius, oxidationStates, bondingType, meltingPoint, boilingPoint, density, groupBlock, namedBy, yearDiscovered, discoveredBy, summary, appearance}){
    this.atomicNumber = atomicNumber

    this.name = name
    this.symbol = symbol
    this.atomicMass = atomicMass
    this.electronicConfigurationRaw = electronicConfiguration
    this.electronegativity = electronegativity
    this.atomicRadius = atomicRadius
    this.oxidationStates = oxidationStates
    this.bondingType = bondingType
    this.meltingPoint = meltingPoint
    this.boilingPoint = boilingPoint
    this.density = density
    this.groupBlock = groupBlock
    this.namedBy = namedBy
    this.yearDiscovered = yearDiscovered
    this.discoveredBy = discoveredBy
    this.summary = summary
    this.appearance = appearance
  }

  electronicConfiguration(expanded=true, format=true){
    if(!this.electronicConfigurationRaw) return undefined

    const parts = this.electronicConfigurationRaw.reduce((list, part) => {
      if(typeof part === 'number'){
        const element = elements[part] // eslint-disable-line no-use-before-define
        if(expanded) return [...list, ...element.electronicConfiguration(true, false)]
        return [...list, element.symbol]
      }

      return [...list, part]
    }, [])

    return format ? parts.sort(({shell: shellA, subshellType: subshellTypeA}, {shell: shellB, subshellType: subshellTypeB}) => {
      if(!shellA) return -1; if(!shellB) return 1

      const indexA = subshellOrder.indexOf(shellA + subshellTypeA)
      const indexB = subshellOrder.indexOf(shellB + subshellTypeB)

      return indexA - indexB
    })
      .map(part => (typeof part === 'string' ? `[${part}]` : `${part.shell}${part.subshellType}${ssn(part.electrons)}`))
      .join(' ')
      : parts
  }

  electronsPerShell(string=false){
    if(!this.electronicConfigurationRaw) return undefined

    const parts = this.electronicConfigurationRaw.reduce((list, part) => (typeof part === 'number' ? [...list, ...elements[part].electronicConfiguration(true, false)] : [...list, part]), []) // eslint-disable-line no-use-before-define

    const shells = parts.reduce((order, {shell, electrons}) => ({...order, [shell]: (order[shell] || 0) + electrons}), {})

    return string ? Object.values(shells).join(', ') : shells
  }

  get groupBlockFormatted(){
    return this.groupBlock ? ({
      nobleGas: 'Noble Gas',
      postTransitionMetal: 'Post Transition Metal',
      nonMetal: 'Non Metal',
      alkaliMetal: 'Alkali Metal',
      alkalineEarthMetal: 'Alkaline Earth Metal',
      transitionMetal: 'Transition Metal'
    })[this.groupBlock] || this.groupBlock.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : undefined
  }
}

const elements = Object.entries(data).reduce((table, [atomicNumber, info]) => ({...table, [atomicNumber]: new Element(atomicNumber, info)}), {})
export default elements
export {default as layout} from './layout'
