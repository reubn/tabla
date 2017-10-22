import {connect} from 'react-redux'

import elements from '../../elements'
import selectElementAction from '../../store/actions/selectElement'

import Info from './Info'

const mapStateToProps = ({periodicTable: {selectedElement}}) => ({elementSelected: selectedElement !== null, element: elements[selectedElement]})
const mapDispatchToProps = {
  selectElement: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber, false),
  close: () => dispatch => selectElementAction(dispatch, null)
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
