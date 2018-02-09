import React from 'react'
import Link from '../../../Link'

import {footer, heart} from './style'

export default () => (
  <svg viewBox="-3.3 128.8 601.8 594" className={footer}>
    <Link to="/about">
      <path className={heart} d="M297.4 716.4c-14.1-13.2-28.1-26-41.8-39.2-29.3-28.1-59.2-55.6-87.4-84.9-44.6-46.4-86-95.5-119.1-151-18.2-30.5-32.9-62.6-40.7-97.4C-3.7 289.4 5.2 238.7 38 193.1c22.8-31.7 54.5-49.2 92.9-55.1 24-3.6 48.1-4.2 71.9 1.4 43.1 10 69.4 37.8 82.4 79.2 2.5 8.1 4.1 16.5 6.3 24.7.9 3.2 1.2 7.7 5.9 7.6 4.6-.1 5.7-4.2 6.6-7.7 1.6-6 2.7-12 4.2-18 7.5-31.6 24.1-56.9 52.6-73.4 12.1-7 25.6-10 39.2-12.6 17.1-3.3 34.3-4.9 51.7-3 32.4 3.4 61.6 14.6 86.9 35.1 26.7 21.6 41.8 50.4 48.5 83.6 11.6 57 2.4 111-25 162-20.7 38.6-46.1 74-74 107.7-38.3 46.2-81.6 87.6-125 128.9-21.8 20.7-43.5 41.6-65.7 62.9z" />
    </Link>
  </svg>
)
