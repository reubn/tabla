import FullElement from './FullElement'

const fullElementsCache = {}
export const fullElement = async atomicNumber => {
  if(!atomicNumber) return {}

  if(fullElementsCache[atomicNumber]) return fullElementsCache[atomicNumber]

  const json = require(`../../data/dist/${atomicNumber}.json`)

  fullElementsCache[atomicNumber] = new FullElement(atomicNumber, await json)
  return fullElementsCache[atomicNumber]
}

export {default as layout} from './layout'

export {default as BasicElement, basicElements} from './BasicElement'
export {FullElement}
