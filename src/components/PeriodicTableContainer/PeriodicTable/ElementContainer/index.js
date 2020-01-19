import {connect} from 'react-redux'

import {bestElement} from '../../../../elements'
import selectElementAction from '../../../../store/actions/selectElement'

import Element from './Element'

const mapStateToProps = ({periodicTable: {selectedElement}}, {atomicNumber}) => ({basicElement: bestElement(atomicNumber), selected: selectedElement === atomicNumber})
const mapDispatchToProps = {
  selectElementAction: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber)
}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({...ownProps, ...stateProps, select: event => (ownProps.visible ? dispatchProps.selectElementAction((ownProps.atomicNumber)): null, event.preventDefault())})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Element)
