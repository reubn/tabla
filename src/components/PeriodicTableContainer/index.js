import {connect} from 'react-redux'

import PeriodicTable from './PeriodicTable'
import cursorMoveAction from '../../store/actions/cursorMove'
import selectElementAction from '../../store/actions/selectElement'

const mapStateToProps = ({periodicTable: {visibleElements, selectedElement}}) => ({visibleElements, selectedElement})
const mapDispatchToProps = dispatch => ({
  deselect: () => selectElementAction(dispatch, null),
  cursorMoveAction: (selectedElement, [dx, dy]) => cursorMoveAction(dispatch, selectedElement, [dx, dy])
})
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  cursorMove: ([dx, dy]) => dispatchProps.cursorMoveAction(stateProps.selectedElement, [dx, dy])
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PeriodicTable)
