import {layout} from '../../elements'

import selectElementAction from './selectElement'

const cursorMoveAction = (dispatch, selectedElement, [dx=0, dy=0]) => {
  let {v: x, w: y} = layout.reduce(({v, w}, group, i) => ((v < 0 || w < 0) ? {v: i, w: group.findIndex(a => a === selectedElement)} : {v, w}), {v: -1, w: -1})

  while(true){
    x = (layout.length + (x + dx)) % layout.length
    y = (layout[x].length + (y + dy)) % layout[x].length

    if(layout[x][y]) return selectElementAction(dispatch, layout[x][y])
  }
}

export default cursorMoveAction
