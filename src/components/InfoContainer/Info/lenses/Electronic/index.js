import React from 'react'

import Lens from '../Lens'

import Diagram from './Diagram'

import {lens, electronicConfiguration, electronsSuperscript} from './style'

const lensComponent = ({element, key}) => (
  <section className={lens} key={key}>
    <Diagram element={element} />
    <section className={electronicConfiguration}>{element.electronicConfiguration(false, {
      element: symbol => symbol,
      shell: shell => shell,
      subshell: subshell => subshell,
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
