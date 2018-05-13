import FullElement from './FullElement'
import {basicElements} from './BasicElement'

export const fullElementsCache = typeof window === 'object' && window.dryfullElement ? {[+window.dryfullElement.an]: new FullElement(window.dryfullElement.an, window.dryfullElement)} : {}

// FullElement is not available initally as code in the global namespace is run before atomicNumbers are passed in from webpack

export const bestElement = atomicNumber => fullElementsCache[atomicNumber] || basicElements[atomicNumber]

export const fullElement = async atomicNumber => {
  if(!atomicNumber) return {}

  if(fullElementsCache[atomicNumber]) return fullElementsCache[atomicNumber]

  if(typeof window !== 'object' && atomicNumber === global.fullElementHack.atomicNumber){
    fullElementsCache[atomicNumber] = global.fullElementHack

    return fullElementsCache[atomicNumber]
  }

  const json = typeof window === 'object'
    ? import(/* webpackChunkName: "fullElement[request]" */`../../data/dist/${atomicNumber}.json`)
    : {}

  fullElementsCache[atomicNumber] = new FullElement(atomicNumber, await json)
  return fullElementsCache[atomicNumber]
}

export {default as layout} from './layout'
export {default as BasicElement} from './BasicElement'

export {basicElements}
export {FullElement}
