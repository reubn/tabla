import React, {Component} from 'react'
import {Group} from '@vx/group';
import {scaleLog, scaleLinear} from '@vx/scale';
import {LinePath, Line, Bar} from '@vx/shape';
import {AxisLeft, AxisBottom} from '@vx/axis';
import {ParentSize} from '@vx/responsive';
import {Point} from '@vx/point'
import {localPoint} from '@vx/event'
import {Tooltip} from '@vx/tooltip'
import {extent, max, min, bisector} from 'd3-array';
import {format} from 'd3-format';

import {lens, label, svg, grid, value, power as powerStyle, foreignObject, axisLabel, relativeWrapper} from './style'

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

class Graph extends Component {
  constructor(props){
    super(props)

    this.state = {
      tooltipData: null,
      tooltipTop: 0,
      tooltipLeft: 0
    }
  }

  handleTooltip({data, event, x, y, xScale, yScale, margin}){
    const {x: xPoint} = localPoint(event);
    const x0 = xScale.invert(xPoint - margin.left);
    const index = bisector(x).left(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1) d = x0 - x(d0) > x(d1) - x0 ? d1 : d0

    this.setState({
      tooltipData: d,
      tooltipLeft: xScale(x(d)),
      tooltipTop: yScale(y(d)),
    });
  }

  render(){
    const {width, height, element: {ionisationEnergies: data}, showTooltip} = this.props
    const {tooltipData, tooltipTop, tooltipLeft} = this.state

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
    const tValues = Array(tNum).fill().map((_, p) => 10 ** p)

    return (
      <section className={relativeWrapper}>
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
              // glyph={(d, i) => (
              //   <circle
              //     key={i}
              //     cx={xScale(x(d))}
              //     cy={yScale(y(d))}
              //     r={4}
              //     fill='var(--colours-white)'
              //     stroke='var(--group-colour)'
              //     strokeWidth={2}
              //   />
              // )}
            />
            <Bar
              x={xScale.range()[0]}
              y={xScale.range()[0]}
              width={width}
              height={height}
              fill="transparent"
              rx={14}
              data={data}
              onTouchStart={data => event => this.handleTooltip({event, data, x, y, xScale, yScale, margin})}
              onTouchMove={data => event => this.handleTooltip({event, data, x, y, xScale, yScale, margin})}
              onMouseMove={data => event => this.handleTooltip({event, data, x, y, xScale, yScale, margin})}
              onMouseLeave={data => event => hideTooltip()}
            />
            <AxisLeft
              scale={yScale}
              tickValues={tValues}
              tickComponent={AxisLeftLabel}
              top={0}
              left={0}
              tickLength={0}
              label="kJ mol⁻¹"
              labelClassName={axisLabel}
              labelOffset={margin.left / 2}
              hideAxisLine
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 }}
                  to={{ x: tooltipLeft, y: yMax }}
                  stroke="rgba(92, 119, 235, 1.000)"
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                  strokeDasharray="2,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill="rgba(92, 119, 235, 1.000)"
                  stroke="white"
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                />
              </g>
            )}
          </Group>
        </svg>
        {tooltipData && (
          [<Tooltip
            top={tooltipTop + margin.top - 12}
            left={tooltipLeft + margin.left + 12}
            style={{
              backgroundColor: 'rgba(92, 119, 235, 1.000)',
              color: 'white',
            }}
           >
            {`${y(tooltipData)} kJ mol⁻¹`}
          </Tooltip>,
          <Tooltip
            top={yMax + margin.top}
            left={tooltipLeft + margin.left}
            style={{
                transform: 'translate(-50%, -50%)',
            }}
          >
            {x(tooltipData)}
          </Tooltip>]
        )}
      </section>
    )
  }
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
          {wh => <Graph element={this.props.element} {...wh} />}
        </ParentSize>
      </section>
    )
  }
}
