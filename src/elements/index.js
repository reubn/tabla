import FullElement from './FullElement'

export const fullElementsCache = typeof window === 'object' && window.dryfullElement ? {[+window.dryfullElement.atomicNumber]: new FullElement(window.dryfullElement.atomicNumber, window.dryfullElement)} : {}

export const fullElement = async atomicNumber => {
  if(!atomicNumber) return {}

  if(fullElementsCache[atomicNumber]) return fullElementsCache[atomicNumber]

  if(typeof window !== 'object' && atomicNumber === global.fullElementHack.atomicNumber){
    fullElementsCache[atomicNumber] = global.fullElementHack

    return fullElementsCache[atomicNumber]
  }

  const json = typeof window === 'object'
    ? (await fetch(`/${atomicNumber}.json`)).json()
    : {}

  fullElementsCache[atomicNumber] = new FullElement(atomicNumber, await json)
  return fullElementsCache[atomicNumber]
}

export {default as layout} from './layout'

export {default as BasicElement, basicElements} from './BasicElement'
export {FullElement}
