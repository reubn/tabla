import React from 'react'
import classnames from 'classnames'

import {close} from './style'

export default ({className, ...props}) => <a {...props} tabindex={0} className={classnames(className, close)}>✕</a>
