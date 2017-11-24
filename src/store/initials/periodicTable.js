import {basicElements} from '../../elements'

export default {
  visibleElements: Object.keys(basicElements).map(n => +n),
  selectedElement: null
}
