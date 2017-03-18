import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import classnames from 'classnames'


import Diagram from './Diagram'
import Data from './Data'

import {info, open, header, name as nameStyle, close as closeStyle, enter, enterActive, leave, leaveActive, appear, appearActive} from './style'

const Info = ({elementSelected, close, element={}, _: {name, atomicNumber}=element}) => (
  <CSSTransitionGroup
    component={props => React.Children.toArray(props.children)[0] || null}
    transitionName={{enter, enterActive, leave, leaveActive, appear, appearActive}}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}>
    {elementSelected ? (
      <section className={classnames(info, {[open]: elementSelected})} key={elementSelected}>
        <header className={header}>
          <span className={closeStyle} onClick={close}>✕</span>
          <Diagram element={element} />
          <a href={`//en.wikipedia.org/wiki/Element_${atomicNumber}`} target="_blank" rel="noopener noreferrer" className={nameStyle}>{name}</a>
        </header>
        <Data element={element} />
      </section>
  ) : null}
  </CSSTransitionGroup>
)

export default Info
