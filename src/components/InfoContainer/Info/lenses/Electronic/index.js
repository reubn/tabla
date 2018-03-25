import React, {Component} from 'react'
import classnames from 'classnames'

import {bestElement} from '../../../../../elements'

import Diagram from './Diagram'

import {lens, electronicConfiguration, full as fullStyle, inside, electronsSuperscript, elementAbbreviation,
        alkaliMetal, halogen, nonMetal, transitionMetal, nobleGas, postTransitionMetal, metalloid, alkalineEarthMetal, actinoid, lanthanoid, unknown} from './style'

const groupColours = {
  alkaliMetal,
  halogen,
  nonMetal,
  transitionMetal,
  nobleGas,
  postTransitionMetal,
  metalloid,
  alkalineEarthMetal,
  actinoid,
  lanthanoid,
  unknown
}

export default class ElectronicLens extends Component {
  constructor(props){
    super(props)
    this.state = {
      full: false
    }
  }

  static test(element){
    return !!element.electronicConfigurationRaw
  }

  setFull(full=!this.state.full){
    this.setState(() => ({full: full}))
  }

  render(){
    return (
      <section className={lens} key={this.props.key}>
        <Diagram element={this.props.element} />
        <section className={electronicConfiguration}>
          {this.props.element.electronicConfiguration(this.state.full, {
            element: atomicNumber => (
              <span
                className={classnames(elementAbbreviation, groupColours[this.props.element.groupBlock])}
                onClick={() => this.setFull(true)}>
                {bestElement(atomicNumber).symbol}
              </span>
            ),
            shell: shell => <span> {shell}</span>,
            subshell: subshell => <span>{subshell}</span>,
            electrons: electrons => <span className={electronsSuperscript}>{electrons}</span>,
            combine: parts => <span className={classnames(inside, {[fullStyle]: this.state.full})} onClick={() => this.state.full && this.setFull(false)}>{parts}</span>
        })}
        </section>
      </section>
    )
  }
}
