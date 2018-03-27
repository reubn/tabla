import React, {Component} from 'react'
import classnames from 'classnames'

import {bestElement} from '../../../../../elements'

import {lens, property, label, figure as figureStyle, sup, hasSup, inline} from './style'

export default class FigureLens extends Component {
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
        {this.props.figures.reduce((shown, figure) => {
          if(!figure.test) return shown

          const figureComponent = (
            <section className={property}>
              <label className={label}>{figure.label}</label>
              <span className={classnames(figureStyle, {[hasSup]: figure.units.sup})}>
                {figure.value}
                {figure.units && <span className={figure.units.sup ? sup : inline}>{figure.units.text}</span>}
              </span>
            </section>
          )
          return [...shown, figureComponent]
        }, [])}
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
