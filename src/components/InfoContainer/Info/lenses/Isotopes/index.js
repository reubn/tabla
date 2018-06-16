import React, {Component} from 'react'
import sigdig from 'sigdig'

import {lens, isotopicMass, th, tr, units} from './style'

export default class IsotopesLens extends Component {
  static test(element){
    return !!element.isotopes
  }

  render(){
    return (
      <section className={lens}>
        <table>
          <thead>
            <tr>
              <th className={th}>Isotope</th>
              <th className={th}>Abundance</th>
              <th className={th}>Half Life</th>
            </tr>
          </thead>
          <tbody>
            {this.props.element.isotopes.map(({neutrons, abundance, halfLife}) => (
              <tr key={neutrons} className={tr}>
                <td>
                  <span className={isotopicMass}>
                    {neutrons + this.props.element.atomicNumber}
                  </span>
                  {this.props.element.symbol}
                </td>
                <td>{abundance ? [sigdig(abundance * 100, 4), <span className={units}>%</span>] : '-'}</td>
                <td>{halfLife ? [sigdig(halfLife.time, 4), <span className={units}>{halfLife.unit || 'y'}</span>] : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}
