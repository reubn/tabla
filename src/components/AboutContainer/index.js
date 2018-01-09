import {connect} from 'react-redux'

import About from './About'

const mapStateToProps = ({about}) => ({visible: about})
const mapDispatchToProps = {
  close: () => dispatch => selectElementAction(dispatch, null)
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
