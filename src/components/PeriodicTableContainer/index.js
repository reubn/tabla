import {connect} from 'react-redux'

import PeriodicTable from './PeriodicTable'

const mapStateToProps = ({periodicTable: {visibleElements}}) => ({visibleElements})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicTable)
