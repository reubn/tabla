import React, {Component} from 'react'
import {Group} from '@vx/group';
import {scaleLog, scaleLinear} from '@vx/scale';
import {LinePath} from '@vx/shape';
import {AxisLeft, AxisBottom} from '@vx/axis';
import {extent, max, min} from 'd3-array';
import {format} from 'd3-format';


import {lens, svg} from './style'

export default class IonisationEnergiesLens extends Component {
  static test(element){
    return element.ionisationEnergies && element.ionisationEnergies.length
  }

  render(){
    const width = 400;
    const height = 300;

    const x = ([i, j]) => i;
    const y = ([i, j]) => j;

    // Bounds
    const margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      range: [0, xMax],
      domain: extent(this.props.element.ionisationEnergies, x)
    });
    const yScale = scaleLog({
      range: [yMax, 1],
      domain: [min(this.props.element.ionisationEnergies, y), max(this.props.element.ionisationEnergies, y)],
      base: 10,
      nice: true
    });

    const maxL = 10 ** Math.ceil(Math.log10(max(this.props.element.ionisationEnergies, y)))
    const minL = 10 ** Math.floor(Math.log10(min(this.props.element.ionisationEnergies, y)))

    const tNum = Math.ceil(Math.log10(maxL - minL)) + 1
    const tValues = Array(tNum).fill().map((_, p) => 10**(p))

    return (
      <section className={lens}>
        <svg viewBox={`0 0 ${width} ${height}`} className={svg}>

          <Group top={margin.top} left={margin.left}>

            <LinePath
              data={this.props.element.ionisationEnergies}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={"var(--group-colour)"}
              glyph={(d, i) => (
                <circle
                  key={i}
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={4}
                  fill='var(--colours-white)'
                  stroke='var(--colours-white-5)'
                  strokeWidth={2}
                />
              )}
            />

            <AxisLeft
              scale={yScale}
              tickValues={tValues}
              tickFormat={n => `10${[...`${Math.round(Math.log10(n))}`].map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`}
              numTicks={10}
              top={0}
              left={0}
              label={'kJ mol⁻¹'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />

            <AxisBottom
              scale={xScale}
              top={yMax}
              tickValues={this.props.element.ionisationEnergies.map(x)}
              tickFormat={format('d')}
              label={'Ionisation'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />

          </Group>
        </svg>
      </section>
    )
  }
}
