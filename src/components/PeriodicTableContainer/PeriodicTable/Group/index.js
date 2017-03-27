import React from 'react'

import {group} from './style'

const Group = ({children, index, total, x=index/total}) => <section className={group} style={{animationDelay: `${(0.9 * (x**2)) - (0.6 * (x**3))}s`}}>{children}</section>

export default Group
