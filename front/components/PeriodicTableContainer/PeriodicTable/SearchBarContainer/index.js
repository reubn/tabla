import {connect} from 'react-redux'

import searchElementsAction from '../../../../store/actions/searchElements'

import SearchBar from './SearchBar'

const mapDispatchToProps = {
  searchElements: query => dispatch => searchElementsAction(dispatch, query)
}

export default connect(null, mapDispatchToProps)(SearchBar)
