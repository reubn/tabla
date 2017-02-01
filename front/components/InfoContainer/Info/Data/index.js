import React from 'react'

import Entry from './Entry'

import schemes from './schemes'
import {data, scroll} from './style'

const Data = ({element}) => (
  <section className={data}>
    <section className={scroll}>
      {schemes.map(scheme => <Entry element={element} scheme={scheme} />)}
    </section>
  </section>
)

export default Data
