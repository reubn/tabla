import {connect} from 'react-redux'

import Info from './Info'

const mapStateToProps = ({periodicTable: {selectedElement}}) => ({selectedElement})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
