import {Component} from 'react'

export default class KeyCombo extends Component {
  componentDidMount(){
    this.bind(this.props)
  }

  UNSAFE_componentWillUpdate({combo: newCombo, handler: newHandler, detection: newDetection}){
    const {combo, handler, detection} = this.props
    if(combo !== newCombo){
      this.unbind({combo, handler, detection})
      this.bind({combo: newCombo, handler: newHandler, detection: newDetection})
    }
  }

  componentWillUnmount(){
    this.unbind(this.props)
  }

  handlePress({key, repeat}){
    if(repeat) return
    if(key === this.props.combo) this.props.handler()
  }

  bind({combo, handler, detection}){
    if(typeof document !== 'object') return
    document.addEventListener(detection || 'keydown', event => this.handlePress(event))
  }

  unbind({combo, handler, detection}){
    if(typeof document !== 'object') return
    document.removeEventListener(detection || 'keydown', event => this.handlePress(event))
  }

  render(){
    return null
  }
}
