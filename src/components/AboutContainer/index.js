import {connect} from 'react-redux'

import About from './About'

const mapStateToProps = ({about}) => ({visible: about})
const mapDispatchToProps = {
  close: () => dispatch => dispatch({type: 'TOGGLE_ABOUT', triggerRedirect: true})
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
