import React from 'react'

import Group from './Group'
import ElementContainer from './ElementContainer'
import Spacer from './Spacer'

import {periodicTable} from './style'

import layout from './layout'

const PeriodicTable = ({visibleElements}) => {
  const groups = layout.map((group, index) => <Group key={index}>{group.map(part => part ? <ElementContainer atomicNumber={part} visible={visibleElements.includes(part)} /> : <Spacer />)}</Group>)
  return <section className={periodicTable}>{groups}</section>
}

export default PeriodicTable
