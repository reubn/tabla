import React from 'react'

import Entry from './Entry'

import schemes from './schemes'
import {data} from './style'

const Data = ({element}) => (
  <section className={data}>
    {schemes.map(scheme => <Entry key={scheme.id} element={element} scheme={scheme} />)}
  </section>
)

export default Data
