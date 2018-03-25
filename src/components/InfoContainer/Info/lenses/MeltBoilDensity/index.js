import React, {Component} from 'react'
import classnames from 'classnames'
import sigdig from 'sigdig'

import {bestElement} from '../../../../../elements'

import {lens, property, label, figure, sup, inline  } from './style'

export default class MeltBoilDensityLens extends Component {
  constructor(props){
    super(props)
    this.state = {
      full: false
    }
  }

  static test(element){
    return !!element.meltingPoint || !!element.boilingPoint || !!element.density
  }

  setFull(full=!this.state.full){
    this.setState(() => ({full: full}))
  }

  render(){
    return (
      <section className={lens}>
        <section className={property}>
          <label className={label}>Melting Point</label>
          <span className={figure}>
            {sigdig(this.props.element.meltingPoint - 273, 5)}
            <span className={sup}>°C</span>
          </span>
        </section>
        <section className={property}>
          <label className={label}>Boiling Point</label>
          <span className={figure}>
            {sigdig(this.props.element.boilingPoint - 273, 5)}
            <span className={sup}>°C</span>
          </span>
        </section>
        <section className={property}>
          <label className={label}>Density</label>
          <span className={figure}>
            {sigdig(this.props.element.density, 5)}
            <span className={inline}>g cm⁻³</span>
          </span>
        </section>
      </section>
    )
  }
}

/* <section class="lens-👩🏻&zwj;🔧" style="
  margin-top: 2rem;
  ">
  <section class="electronicConfiguration-🗝">
  <span class="electronicConfigurationInline-👊" style="
    display: flex;
     ">
     <section class="a"><label class="label-🏃🏼">Melting Point</label><span style="
       display: flex;
       justify-content: center;
        ">116.6<span class="electronsSuperscript-🔗">°C</span></span>
     </section>  <section class="a"><label class="label-🏃🏼">Boiling Point</label><span>120.85<span class="electronsSuperscript-🔗">°C</span></span>
     </section><section class="a"><label class="label-🏃🏼">Density</label><span>116.6<span class="" style="
       vertical-align: middle;
       font-size: 0.8rem;
       font-weight: bold;
       color: var(--colours-grey-4);
       margin-left: 2px;
       ">g dm⁻¹</span></span>
     </section></span></section></section> */

//      .a {
//     display: flex;
//     width: 50%;
//     flex-direction: column;
//     height: 4rem;
//     justify-content: center;
// }
//
// .a:not(:last-of-type) {
//     border-right: solid 1px var(--colours-white-3);
// }
