import React from 'react'

import ElectronicLens from './Electronic'

const lenses = [ElectronicLens]

export default element => lenses.reduce((active, Current) => Current.test(element) ? [...active, <Current element={element} />] : active, [])
