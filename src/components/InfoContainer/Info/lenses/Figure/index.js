import React, {Component} from 'react'
import classnames from 'classnames'

import {bestElement} from '../../../../../elements'

import {lens, property, label as labelStyle, figure as figureStyle, sup, hasSup, inline} from './style'

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
        {this.props.figures.reduce((shown, {test, label, value, units={}}, index) => {
          if(!test) return shown

          const figureComponent = (
            <section className={property} key={label + index}>
              <label className={labelStyle}>{label}</label>
              <span className={classnames(figureStyle, {[hasSup]: units.sup})}>
                {value}
                {units.text && <span className={units.sup ? sup : inline}>{units.text}</span>}
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
