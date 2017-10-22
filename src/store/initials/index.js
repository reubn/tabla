import periodicTable from './periodicTable'

export default (typeof window === 'object' && window.dryState) || {
  periodicTable
}
