import React from 'react'

import {element as elementStyle} from './style'

const Element = ({element}) => <section className={elementStyle}>{JSON.stringify(element)}</section>

export default Element
