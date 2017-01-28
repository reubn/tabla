import elements from '../../../data'

export default {
  visibleElements: Object.keys(elements).map(n => +n),
  selectedElement: null
}
