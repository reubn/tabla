import React from 'react'
import classnames from 'classnames'

import {entry, title as titleStyle, changeable, content as contentStyle} from './style'

class Entry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      format: 0
    }
  }
  render(){
    const {element, scheme: {test, formats}} = this.props

    if(!test(element)) return null
    const {title, content} = formats[this.state.format](element)

    return (
      <span className={entry}>
        <span className={classnames(titleStyle, {[changeable]: formats.length - 1})} onClick={() => this.setState(({format: old}) => ({format: (old + 1) % formats.length}))}>{title}</span>
        <span className={contentStyle}>{content}</span>
      </span>
    )
  }
}

export default Entry
