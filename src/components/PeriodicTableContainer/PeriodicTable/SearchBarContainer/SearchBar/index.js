import React from 'react'
import classnames from 'classnames'

import {container, searchBar, swipeContainer, swipe, full} from './style'

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: ''
    }
  }
  onChange(event){
    this.setState({query: event.target.value})
    this.props.searchElements(event.target.value)
  }
  render(){
    return (
      <section className={container}>
        <input type="text" className={searchBar} value={this.state.query} onFocus={() => this.setState({focus: true})} onBlur={() => this.setState({focus: false})} onChange={event => this.onChange(event)} placeholder="Search..." autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <span className={swipeContainer}>
          <span className={classnames(swipe, {[full]: this.state.focus})} />
        </span>
      </section>
    )
  }
}

export default SearchBar
