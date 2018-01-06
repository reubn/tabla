import Fuse from 'fuse.js'

import {basicElements} from '../../elements/'

import selectElementAction from './selectElement'

const options = {
  id: 'atomicNumber',
  threshold: 0.2,
  minMatchCharLength: 2,
  keys: ['name', 'symbol', 'atomicNumber', 'atomicMass', 'atomicMass.v']
}

const fuse = new Fuse(Object.values(basicElements), options)
const fuseSearch = query => (query.trim() ? fuse.search(query).map(n => +n) : Object.keys(basicElements).map(n => +n))

const searchElementsAction = (dispatch, query) => {
  if(!query) return selectElementAction(dispatch, null) && dispatch({type: 'VISIBLE_ELEMENTS', atomicNumbers: Object.keys(basicElements).map(n => +n)})

  const atomicNumbers = fuseSearch(query)

  dispatch({type: 'VISIBLE_ELEMENTS', atomicNumbers})
  if(atomicNumbers[0]) return selectElementAction(dispatch, atomicNumbers[0])
  selectElementAction(dispatch, null)
}

export default searchElementsAction
