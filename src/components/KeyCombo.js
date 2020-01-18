import {Component} from 'react'
import shortway from 'shortway'

export default class KeyCombo extends Component {
  UNSAFE_componentWillMount(){
    this.bind(this.props)
  }

  UNSAFE_componentWillUpdate({combo: newCombo, handler: newHandler}){
    const {combo, handler} = this.props
    if(combo !== newCombo || handler !== newHandler){
      this.unbind()
      this.bind({combo: newCombo, handler: newHandler})
    }
  }

  componentWillUnmount(){
    this.unbind(this.props)
  }

  bind({combo, handler}){
    if(typeof document !== 'object') return

    this.shortway = shortway(combo, handler)
    document.addEventListener('keydown', this.shortway)
  }

  unbind(){
    if(typeof document !== 'object') return
    document.removeEventListener('keydown', this.shortway)
  }

  render(){
    return null
  }
}
