import React, {Component} from 'react'

import Diagram from './Diagram'

import {lens} from './style'

export default class ElectronicDiagramLens extends Component {
  static test(element){
    return !!element.electronicConfigurationRaw
  }

  render(){
    return (
      <section className={lens}>
        <Diagram element={this.props.element} />
      </section>
    )
  }
}
