import React, {Component} from 'react'
import {Group} from '@vx/group';
import {scaleLog, scaleLinear} from '@vx/scale';
import {LinePath, Line} from '@vx/shape';
import {AxisLeft, AxisBottom} from '@vx/axis';
import {ParentSize} from '@vx/responsive';
import {Point} from '@vx/point'
import {extent, max, min} from 'd3-array';
import {format} from 'd3-format';

import {lens, label, svg, grid, value, power as powerStyle, foreignObject, axisLabel} from './style'

const AxisLeftLabel = ({x, y, formattedValue})=> {
  return (
    <foreignObject x={x} y={y} className={foreignObject}>
      <span className={value}>
        10
        <span className={powerStyle}>
          {Math.round(Math.log10(formattedValue))}
        </span>
      </span>
    </foreignObject>
  )
}

const graph = ({width, height, element}) => {
  const data = element.ionisationEnergies

  const x = ([i, j]) => i;
  const y = ([i, j]) => j;

  // Bounds
  const margin = {
    top: 20,
    bottom: 60,
    left: 80,
    right: 20,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLog({
    range: [yMax, 1],
    domain: [min(data, y), max(data, y)],
    base: 10,
    nice: true
  });

  const maxL = 10 ** Math.ceil(Math.log10(max(data, y)))
  const minL = 10 ** Math.floor(Math.log10(min(data, y)))

  const tNum = Math.ceil(Math.log10(maxL - minL)) + 1
  const tValues = Array(tNum).fill().map((_, p) => 10**(p))

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={svg}>

      <Group top={margin.top} left={margin.left}>
        <Group className={grid}>
          {tValues.map(d => {
            const yP = yScale(d)

            // if(yP === yScale.range()[0]) return null

            const fromPoint = new Point({x: 0, y: yP})
            const toPoint = new Point({x: xScale.range()[1], y: yP})
            return (
              <Line
                key={`row-line-${d}`}
                from={fromPoint}
                to={toPoint}
                stroke='var(--colours-white-5)'
                strokeWidth={0.5}
              />
            )
          })}
        </Group>
        <LinePath
          data={data}
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
              stroke='var(--group-colour)'
              strokeWidth={2}
            />
          )}
        />
        <AxisLeft
          scale={yScale}
          tickValues={tValues}
          tickComponent={AxisLeftLabel}
          top={0}
          left={0}
          tickLength={0}
          label="kJ mol ⁻¹"
          labelClassName={axisLabel}
          labelOffset={margin.left / 2}
          hideAxisLine
        />
      </Group>
    </svg>
  )
}

export default class IonisationEnergiesLens extends Component {
  static test(element){
    return element.ionisationEnergies && element.ionisationEnergies.length
  }

  render(){
    return (
      <section className={lens}>
        <label className={label}>Ionisation Energies</label>
        <ParentSize>
          {wh => graph({...wh, element: this.props.element})}
        </ParentSize>
      </section>
    )
  }
}
