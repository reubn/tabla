import {connect} from 'react-redux'

import PeriodicTable from './PeriodicTable'

const mapStateToProps = ({periodicTable: {visibleElements, selectedElement}}) => ({visibleElements, selectedElement})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicTable)
