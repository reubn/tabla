import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import classnames from 'classnames'

import {bestElement} from '../../../elements'

import lenses from './lenses'

import {info, open, enter, enterActive, exit, exitActive, appear, appearActive, name, scroll,
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
      element: bestElement(atomicNumber) || {}
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

    this.setState({element: bestElement(newAtomicNumber) || {}})

    const resolvedElement = await fullElement
    this.setState({element: resolvedElement})
  }

  render(){
    return (
      <CSSTransition
        in={!!this.props.atomicNumber}
        classNames={{enter, enterActive, exit, exitActive, appear, appearActive}}
        timeout={200}
      >
        <section className={classnames(info, {[open]: !!this.props.atomicNumber}, groupColours[this.state.element.groupBlock] || unknown)}>
          <section className={scroll}>
            <a href={`//en.wikipedia.org/wiki/Element_${this.state.element.atomicNumber}`} target="_blank" rel="noopener noreferrer" className={name}>{this.state.element.name}</a>
            {lenses(this.state.element)}
          </section>
        </section>
        </CSSTransition>
    )
  }
}

export default Info
