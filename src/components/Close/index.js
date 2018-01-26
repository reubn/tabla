import React from 'react'
import classnames from 'classnames'

import {close} from './style'

export default ({className, ...props}) => <span {...props} className={classnames(className, close)}>✕</span>
