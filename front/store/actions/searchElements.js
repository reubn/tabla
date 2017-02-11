import Fuse from 'fuse.js'

import elements from '../../elements'

const options = {
  id: 'atomicNumber',
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: ['name', 'symbol', 'atomicNumber']
}

const fuse = new Fuse(Object.values(elements), options)

function searchElementsAction(dispatch, query){
  dispatch({type: 'VISIBLE_ELEMENTS', elements: query.trim() ? fuse.search(query).map(n => +n) : Object.keys(elements).map(n => +n)})
}

export default searchElementsAction
