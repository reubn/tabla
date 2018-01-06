import React from 'react'

import Group from './Group'
import ElementContainer from './ElementContainer'
import Spacer from './Spacer'
import SearchBarContainer from './SearchBarContainer'
import Footer from './Footer'
import KeyCombo from '../../KeyCombo'

import {periodicTable} from './style'

import {layout} from '../../../elements'

const PeriodicTable = ({visibleElements, selectedElement, cursorMove, deselect}) => {
  const groups =
    layout.map((group, groupIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <Group key={groupIndex} index={groupIndex} total={layout.length} containsSelectedElement={group.includes(selectedElement)}>
        {group.map((part, partIndex) => (
          part
          ? <ElementContainer key={part} atomicNumber={part} visible={visibleElements.includes(part)} />
          // eslint-disable-next-line react/no-array-index-key
          : <Spacer key={`spacer-${partIndex}`} />
        ))}
      </Group>
    ))

  return (
    <section className={periodicTable}>
      <SearchBarContainer />
      {groups}
      <Footer />

      <KeyCombo combo="top" handler={() => cursorMove([0, -1])} />
      <KeyCombo combo="down" handler={() => cursorMove([0, 1])} />
      <KeyCombo combo="left" handler={() => cursorMove([-1, 0])} />
      <KeyCombo combo="right" handler={() => cursorMove([1, 0])} />
      <KeyCombo combo="esc" handler={deselect} />
    </section>
  )
}

export default PeriodicTable
