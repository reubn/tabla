import {connect} from 'react-redux'

import PeriodicTable from './PeriodicTable'
import cursorMoveAction from '../../store/actions/cursorMove'
import selectElementAction from '../../store/actions/selectElement'

const mapStateToProps = ({periodicTable: {visibleElements, selectedElement}}) => ({visibleElements, selectedElement})
const mapDispatchToProps = dispatch => ({
  deselect: () => selectElementAction(dispatch, null),
  cursorMoveAction: (selectedElement, [dx, dy]) => cursorMoveAction(dispatch, selectedElement, [dx, dy]),
  atomicNumberNavigateAction: (selectedElement, dAn) => selectElementAction(dispatch, selectedElement + dAn)
})
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  cursorMove: ([dx, dy]) => dispatchProps.cursorMoveAction(stateProps.selectedElement, [dx, dy]),
  atomicNumberNavigate: dAn => dispatchProps.atomicNumberNavigateAction(stateProps.selectedElement, dAn)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PeriodicTable)
