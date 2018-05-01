import {connect} from 'react-redux'

import {fullElement as getFullElement} from '../../elements'
import selectElementAction from '../../store/actions/selectElement'

import Info from './Info'

const mapStateToProps = ({periodicTable: {selectedElement}}) => ({atomicNumber: selectedElement, fullElement: getFullElement(selectedElement)})
const mapDispatchToProps = {
  selectElement: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber, false),
  close: () => dispatch => selectElementAction(dispatch, null)
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
