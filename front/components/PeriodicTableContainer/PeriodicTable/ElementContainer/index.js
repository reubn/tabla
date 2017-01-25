import React from 'react'

import elements from '../../../../../data'

import Element from './Element'

const ElementContainer = ({atomicNumber}) => <Element element={{...elements[atomicNumber], atomicNumber}} />

export default ElementContainer
