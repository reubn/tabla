import React, {Component} from 'react'
import classnames from 'classnames'

import {bestElement} from '../../../../../elements'

import {electronicConfiguration, full as fullStyle, inside, electronsSuperscript, elementAbbreviation,
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

export default class ElectronicConfiguration extends Component {
  constructor(props){
    super(props)
    this.state = {
      full: false
    }
  }

  setFull(full=!this.state.full){
    this.setState(() => ({full: full}))
  }

  render(){
    return (
      <span className={classnames(electronicConfiguration, {[fullStyle]: this.state.full})} onClick={() => this.state.full && this.setFull(false)}>
        {this.props.element.electronicConfiguration(this.state.full, part => typeof part === 'number'
          ? (
            <span
              key={part}
              className={classnames(elementAbbreviation, groupColours[this.props.element.groupBlock])}
              onClick={() => this.setFull(true)}>
              {bestElement(part).symbol}
            </span>
          )
          : (
            <span key={`${part.shell}${part.subshell}${part.electrons}`}>
              {' '}
              {part.shell}
              {part.subshell}
              <span className={electronsSuperscript}>
                {part.electrons}
              </span>
            </span>
          )
        )}
      </span>
    )
  }
}
