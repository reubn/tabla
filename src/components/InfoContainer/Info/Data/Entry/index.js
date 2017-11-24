import React from 'react'
import classnames from 'classnames'
import {entry, title as titleStyle, changeable, content as contentStyle, unit as unitStyle} from './style'

class Entry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      format: 0
    }
  }
  render(){
    const {element, scheme: {test, formats}, loading} = this.props

    const {title, content, unit} = test(element)
      ? formats[this.state.format](element)
      : (loading
        ? {
          title: '',
          content: '',
          unit: ''
        }
        : {})

    if(title === undefined) return null

    return (
      <span className={entry}>
        <span className={classnames(titleStyle, {[changeable]: formats.length - 1})} onClick={() => this.setState(({format: old}) => ({format: (old + 1) % formats.length}))}>{title}</span>
        <span className={contentStyle}>
          <span>
            {content}
            {unit && <span className={classnames(unitStyle, {[changeable]: formats.length - 1})} onClick={() => this.setState(({format: old}) => ({format: (old + 1) % formats.length}))}>{unit}</span>}
          </span>
        </span>
      </span>
    )
  }
}

export default Entry
