import React from 'react'

import {container, searchBar} from './style'

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
        <input type="text" className={searchBar} value={this.state.query} onChange={event => this.onChange(event)} placeholder="Search..." />
      </section>
    )
  }
}

export default SearchBar
