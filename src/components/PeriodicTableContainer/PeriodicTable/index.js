import React from 'react'

import Group from './Group'
import ElementContainer from './ElementContainer'
import Spacer from './Spacer'
import SearchBarContainer from './SearchBarContainer'
import Footer from './Footer'
import KeyCombo from '../../KeyCombo'

import {periodicTable} from './style'

import {layout} from '../../../elements'

const PeriodicTable = ({visibleElements, selectedElement, cursorMove, deselect, atomicNumberNavigate}) => {
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

      <KeyCombo combo="ArrowUp" handler={() => cursorMove([0, -1])} />
      <KeyCombo combo="ArrowDown" handler={() => cursorMove([0, 1])} />
      <KeyCombo combo="ArrowLeft" handler={() => cursorMove([-1, 0])} />
      <KeyCombo combo="ArrowRight" handler={() => cursorMove([1, 0])} />
      <KeyCombo combo="-" handler={() => atomicNumberNavigate(-1)} />
      <KeyCombo combo="+" handler={() => atomicNumberNavigate(+1)} />
      <KeyCombo combo="Escape" handler={deselect} />
    </section>
  )
}

export default PeriodicTable
