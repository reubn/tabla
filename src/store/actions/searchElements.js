import Fuse from 'fuse.js'

import elements from '../../elements'

const options = {
  id: 'atomicNumber',
  threshold: 0.2,
  minMatchCharLength: 2,
  keys: ['name', 'symbol', 'atomicNumber']
}

const fuse = new Fuse(Object.values(elements), options)

const operators = [
  {lex: '=', func: (a, b) => a == b},
  {lex: '!=', func: (a, b) => a != b},
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
  console.log([...queries, {func, key, value}])
  return [...queries, {func, key, value}]
}, [])

const search = (data, queries) => data.filter(element => {
  for(const {func, key, value} of queries) if(!func(element[key], value)) return false
  return true
})


function searchElementsAction(dispatch, query){
  const atomicNumbers = query.includes('=') || query.includes('>') || query.includes('<')
    ? search(Object.values(elements), parse(query)).map(({atomicNumber}) => +atomicNumber)
    : query.trim() ? fuse.search(query).map(n => +n) : Object.keys(elements).map(n => +n)

  dispatch({type: 'VISIBLE_ELEMENTS', atomicNumbers})
}

export default searchElementsAction
