import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import classnames from 'classnames'

import {basicElements} from '../../../elements'

import Close from '../../Close'

import Diagram from './Diagram'
import Data from './Data'

import {info, open, header, name as nameStyle, enter, enterActive, exit, exitActive, appear, appearActive,
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

class Info extends Component {
  constructor({atomicNumber}){
    super()
    this.state = {
      element: typeof window === 'object' ? (atomicNumber ? basicElements[atomicNumber] : {}) : (global.fullElementHack || {})
    }
  }
  async componentWillMount(){
    if(typeof window === 'object'){
      const resolvedElement = await this.props.fullElement
      this.setState({element: resolvedElement})
    }
  }

  async componentWillReceiveProps({atomicNumber: newAtomicNumber, fullElement}){
    const oldAtomicNumber = this.props.atomicNumber
    if((newAtomicNumber === oldAtomicNumber) || !newAtomicNumber) return

    this.setState({element: newAtomicNumber ? basicElements[newAtomicNumber] : {}})

    const resolvedElement = await fullElement
    this.setState({element: resolvedElement})
  }

  render(){
    return (
      <CSSTransition
        in={this.props.elementSelected}
        classNames={{enter, enterActive, exit, exitActive, appear, appearActive}}
        timeout={200}
      >
        <section className={classnames(info, {[open]: this.props.elementSelected}, groupColours[this.state.element.groupBlock] || unknown)}>
          <header className={header}>
            <Close onClick={this.props.close} />
            <a href={`//en.wikipedia.org/wiki/Element_${this.state.element.atomicNumber}`} target="_blank" rel="noopener noreferrer" className={nameStyle}>{this.state.element.name}</a>
            <Diagram element={this.state.element} />
          </header>
          <Data element={this.state.element} />
        </section>
      </CSSTransition>
    )
  }
}

export default Info
