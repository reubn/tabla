import React from 'react'

import {bestElement} from '../../../../../elements'

import Lens from '../Lens'

import Diagram from './Diagram'

import {lens, electronicConfiguration, electronsSuperscript, elementAbbreviation} from './style'

const lensComponent = ({element, key}) => (
  <section className={lens} key={key}>
    <Diagram element={element} />
    <section className={electronicConfiguration}>{element.electronicConfiguration(false, {
      element: atomicNumber => <span className={elementAbbreviation}>{bestElement(atomicNumber).symbol}</span>,
      shell: shell => <span> {shell}</span>,
      subshell: subshell => <span>{subshell}</span>,
      electrons: electrons => <span className={electronsSuperscript}>{electrons}</span>,
      combine: parts => <span>{parts}</span>
    })}</section>
  </section>
)

export default class ElectronicLens extends Lens {
  get test(){
    return !!this.element.electronicConfigurationRaw
  }

  get component(){
    return lensComponent(this)
  }
}
