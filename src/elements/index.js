import FullElement from './FullElement'

const fullElementsCache = {}
export const fullElement = async atomicNumber => {
  if(!atomicNumber) return {}

  if(fullElementsCache[atomicNumber]) return fullElementsCache[atomicNumber]

  const json = typeof window === 'object'
    : __non_webpack_require__(`../../data/dist/${atomicNumber}`) // eslint-disable-line no-undef
    ? (await fetch(`/${atomicNumber}.json`)).json()

  fullElementsCache[atomicNumber] = new FullElement(atomicNumber, await json)
  return fullElementsCache[atomicNumber]
}

export {default as layout} from './layout'

export {default as BasicElement, basicElements} from './BasicElement'
export {FullElement}
