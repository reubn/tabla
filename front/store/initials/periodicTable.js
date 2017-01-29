import elements from '../../elements'

export default {
  visibleElements: Object.keys(elements).map(n => +n),
  selectedElement: null
}
