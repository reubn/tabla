import FullElement from './FullElement'

export const fullElement = async atomicNumber => {
  if(!atomicNumber) return {}

  const json = typeof window === 'object'
    ? import(/* webpackChunkName: "fullElements" */`../../data/dist/${atomicNumber}`)
    : __non_webpack_require__(`../../data/dist/${atomicNumber}`) // eslint-disable-line no-undef

  return new FullElement(atomicNumber, await json)
}

export {default as layout} from './layout'

export {default as BasicElement, basicElements} from './BasicElement'
export {FullElement}
