import {connect} from 'react-redux'

import elements from '../../../../../data'
import selectElementAction from '../../../../store/actions/selectElement'

import Element from './Element'

const mapStateToProps = ({periodicTable: {visibleElements}}, {atomicNumber}) => ({element: {...elements[atomicNumber], atomicNumber}})
const mapDispatchToProps = {
  selectElementAction: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber)
}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({...ownProps, ...stateProps, select: () => dispatchProps.selectElementAction((ownProps.atomicNumber))})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Element)
