import React from 'react'
import Link from '../Link'

import {logo, dot, cross} from './style'

const Logo = () => (
  <Link to="/">
    <svg viewBox="0 0 264 264" className={logo}>
      <rect className={dot} transform="rotate(45 132 35.833)" x="107" y="10.833" width="50" />
      <rect className={dot} transform="rotate(45 228.167 132)" x="203.167" y="107" width="50" />
      <rect className={dot} transform="rotate(45 35.833 132)" x="10.833" y="107" width="50" />
      <rect className={dot} transform="rotate(45 132 228.167)" x="107" y="203.167" width="50" />

      <rect className={cross} transform="rotate(45 132 132)" x="107" y="107" width="50" />
      <rect className={cross} transform="rotate(45 197.76 197.76)" x="147.761" y="172.761" width="100" />
      <rect className={cross} transform="rotate(45 66.24 66.24)" x="16.239" y="41.239" width="100" />
      <rect className={cross} transform="rotate(135 66.24 197.76)" x="16.239" y="172.761" width="100" />
      <rect className={cross} transform="rotate(135 197.76 66.24)" x="147.761" y="41.239" width="100" />
    </svg>
  </Link>
)

export default Logo
