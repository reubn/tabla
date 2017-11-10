import Fuse from 'fuse.js'

import elements from '../../elements'

import selectElementAction from './selectElement'

const options = {
  id: 'atomicNumber',
  threshold: 0.2,
  minMatchCharLength: 2,
  keys: ['name', 'symbol', 'atomicNumber']
}

const fuse = new Fuse(Object.values(elements), options)

const operators = [
  {lex: '=', func: (a, b) => a == b}, // eslint-disable-line eqeqeq
  {lex: '!=', func: (a, b) => a != b}, // eslint-disable-line eqeqeq
  {lex: '>', func: (a, b) => +a > +b},
  {lex: '<', func: (a, b) => +a < +b},
  {lex: '>=', func: (a, b) => +a >= +b},
  {lex: '<=', func: (a, b) => +a <= +b},
  {lex: '^=', func: (a, b) => a.startsWith(b)},
  {lex: '=^', func: (a, b) => a.endsWith(b)},
  {lex: '~=', func: (a, b) => a.split(' ').includes(b)},
  {lex: '*=', func: (a, b) => a.includes(b)}
].sort(({lex: {length: a}}, {lex: {length: b}}) => b - a)

const parse = string => string.split(' ').reduce((queries, query) => {
  const {func, lex} = operators.find(({lex: l}) => query.includes(l)) || {}
  if(!lex) return queries

  const [key, value] = query.split(lex)
  return [...queries, {func, key, value}]
}, [])

const search = (data, queries) => data.filter(element => !queries.some(({func, key, value}) => !func(element[key], value)))

const operatorSearch = query => search(Object.values(elements), parse(query)).map(({atomicNumber}) => +atomicNumber)
const fuseSearch = query => (query.trim() ? fuse.search(query).map(n => +n) : Object.keys(elements).map(n => +n))

const searchElementsAction = (dispatch, query) => {
  if(!query) return selectElementAction(dispatch, null) && dispatch({type: 'VISIBLE_ELEMENTS', atomicNumbers: Object.keys(elements).map(n => +n)})

  const test = query.includes('=') || query.includes('>') || query.includes('<')
  const atomicNumbers = (test ? operatorSearch : fuseSearch)(query)

  dispatch({type: 'VISIBLE_ELEMENTS', atomicNumbers})
  if(atomicNumbers[0]) return selectElementAction(dispatch, atomicNumbers[0])
  selectElementAction(dispatch, null)
}

export default searchElementsAction
