import periodicTable from './periodicTable'
import about from './about'

export default (typeof window === 'object' && window.dryState) || {
  periodicTable,
  about
}
