import React from 'react'
import {connect} from 'react-redux'

import elements, {Element} from '../../elements'
import selectElementAction from '../../store/actions/selectElement'

import Info from './Info'

const mapStateToProps = ({periodicTable: {selectedElement}}) => ({elementSelected: selectedElement !== null, element: elements[selectedElement]})
const mapDispatchToProps = {
  selectElement: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber, false),
  close: () => dispatch => selectElementAction(dispatch, null)
}

class InfoStateSyncer extends React.Component {
  componentWillMount(){
    this.init(this.props)
  }
  componentWillUnmount(){
    this.props.close()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.atomicNumber !== this.props.params.atomicNumber) this.init(nextProps)
  }
  init({params: {atomicNumber}, location: {action}, selectElement}){
    if(action === 'POP' || action === 'REPLACE') return selectElement(+atomicNumber)
  }
  render(){return this.props.element instanceof Element ? <Info {...this.props} /> : null}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStateSyncer)
