import React, {Component} from 'react'
import classnames from 'classnames'
import sigdig from 'sigdig'

import {lens, label, text} from './style'

export default class TextLens extends Component {
  constructor(props){
    super(props)
    this.state = {
      full: false
    }
  }

  setFull(full=!this.state.full){
    this.setState(() => ({full: full}))
  }

  render(){
    return (
      <section className={lens}>
        <label className={label}>{this.props.label}</label>
        <section className={text}>{this.props.text}</section>
      </section>
    )
  }
}
