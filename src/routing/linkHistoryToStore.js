import {LOCATION_CHANGE} from 'react-router-redux'

import history from './history'

export default ({dispatch}) => {
  dispatch({type: LOCATION_CHANGE, payload: history.location})
  history.listen(location => dispatch({type: LOCATION_CHANGE, payload: location}))
}
