import React, {Component} from 'react'
import classnames from 'classnames'

import {bestElement} from '../../../../../elements'

import Diagram from './Diagram'

import {lens, electronicConfiguration, electronsSuperscript, elementAbbreviation,
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
  static test(element){
    return !!element.electronicConfigurationRaw
  }

  render(){
    return (
      <section className={lens} key={this.props.key}>
        <Diagram element={this.props.element} />
        <section className={electronicConfiguration}>
          {this.props.element.electronicConfiguration(false, {
            element: atomicNumber => (
              <span
                className={classnames(elementAbbreviation, groupColours[this.props.element.groupBlock])}>
                {bestElement(atomicNumber).symbol}
              </span>
            ),
            shell: shell => <span> {shell}</span>,
            subshell: subshell => <span>{subshell}</span>,
            electrons: electrons => <span className={electronsSuperscript}>{electrons}</span>,
            combine: parts => <span>{parts}</span>
        })}
        </section>
      </section>
    )
  }
}
