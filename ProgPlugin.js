import {ProgressPlugin} from 'webpack'
import chalk from 'chalk'
import logUpdate from 'log-update'

export default class ProgPlugin {
  state = {}

  length = 40
  symbol = '█'

  _plugin = new ProgressPlugin((...a) => this.handler(...a))

  handler(progress, message, ...details){
    if(details[0] === 'unnamed compat plugin') return

    this.setState({progress, message, details})
  }

  setState(newState){
    this.state = {...this.state, ...newState}
    this.render()
  }

  render(){
    const {progress, message='', details=[], altColour=false} = this.state

    const boundary = progress * this.length
    const filled = (altColour ? chalk.hex('#c34ef9') : chalk.hex('#ffb400'))(this.symbol)
    const blank = chalk.grey(this.symbol)

    const bar = Array(this.length).fill().map((_, index) => (index < boundary ? filled : blank)).join('')

    const formattedDetails =
      details[2]
      ? details[2]
        .split('!')
        .reduce((string, part, index, {length}) => `${string} -> ${(index === length - 1) ? part.replace(process.cwd(), '') : part.match(/\/(([^/]*?)(loader|plugin))\//)[0]}`, '')
      : ''

    logUpdate(`${chalk.hex('#ffb400')('building')}    ${bar} ${message} (${Math.round(progress * 100)}%) ${chalk.grey(details[0])}
    ${chalk.grey(formattedDetails)}`)

    if(progress >= 1) logUpdate.done()
  }
}
