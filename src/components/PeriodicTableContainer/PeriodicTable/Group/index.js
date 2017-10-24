import React from 'react'
import classnames from 'classnames'

import {group, containsSelectedElement as containsSelectedElementStyle} from './style'

const Group = ({children, index, total, containsSelectedElement, x=index/total}) => <section className={classnames(group, {[containsSelectedElementStyle]: containsSelectedElement})} style={{animationDelay: `${((0.9 * (x**2)) - (0.6 * (x**3))).toFixed(3)}s`}}>{children}</section>

export default Group
