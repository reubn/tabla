import ssn from 'superscript-number'

import basicJSON from '../../data/dist/basic'

import subshellOrder from './subshellOrder'

export default class BasicElement {
  constructor(atomicNumber, {n, s, am, ec, gb, r}){
    this.atomicNumber = atomicNumber

    this.name = n
    this.symbol = s
    this.atomicMass = am
    this.electronicConfigurationRaw = ec.map(part => part.sh ? {shell: part.sh, subshell: part.su, electrons: part.e} : part)
    this.groupBlock = gb
    this.radioactive = r
  }

  electronicConfiguration(expanded=true, format=true){
    if(!this.electronicConfigurationRaw) return undefined

    const parts = this.electronicConfigurationRaw.reduce((list, part) => {
      if(typeof part === 'number'){
        const element = basicElements[part] // eslint-disable-line no-use-before-define
        if(expanded) return [...list, ...element.electronicConfiguration(true, false)]
        return [...list, element.symbol]
      }

      return [...list, part]
    }, [])

    return format ? parts.sort(({shell: shellA, subshell: subshellA}, {shell: shellB, subshell: subshellB}) => {
      if(!shellA) return -1; if(!shellB) return 1

      const indexA = subshellOrder.indexOf(shellA + subshellA)
      const indexB = subshellOrder.indexOf(shellB + subshellB)

      return indexA - indexB
    })
      .map(part => (typeof part === 'string' ? `[${part}]` : `${part.shell}${part.subshell}${ssn(part.electrons)}`))
      .join(' ')
      : parts
  }

  electronsPerShell(string=false){
    if(!this.electronicConfigurationRaw) return undefined

    const parts = this.electronicConfigurationRaw.reduce((list, part) => (typeof part === 'number' ? [...list, ...basicElements[part].electronicConfiguration(true, false)] : [...list, part]), []) // eslint-disable-line no-use-before-define

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

export const basicElements = basicJSON.map((json, index) => json ? new BasicElement(index, json) : {})
