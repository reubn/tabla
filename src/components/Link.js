import React, {Component} from 'react'
import {createLocation} from 'history'

import history from '../routing/history'

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

class Link extends Component {
  handleClick = event => {
    if(this.props.onClick) this.props.onClick(event)

    const onClickPreventedDefault = !event.defaultPrevented // onClick prevented default
    const leftClick = event.button === 0 // ignore everything but left clicks
    const target = !this.props.target // let browser handle "target=_blank" etc.
    const modifierKeys = !isModifiedEvent(event) // ignore clicks with modifier keys

    if(!onClickPreventedDefault || !leftClick || !target || !modifierKeys) return

    event.preventDefault()

    const {to} = this.props

    history.push(to)
  }

  render(){
    const {to, innerRef, ...props} = this.props

    const location = typeof to === 'string' ? createLocation(to, null, null, history.location) : to

    const href = history.createHref(location)
    return <a {...props} onClick={this.handleClick} href={href} ref={innerRef} /> // eslint-disable-line jsx-a11y/anchor-has-content
  }
}

export default Link
