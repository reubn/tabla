import {connect} from 'react-redux'
import debounce from 'debounce-fn'

import searchElementsAction from '../../../../store/actions/searchElements'

import SearchBar from './SearchBar'

const debounced = debounce((query, dispatch) => searchElementsAction(dispatch, query), {wait: 250})

const mapDispatchToProps = {
  searchElements: query => dispatch => debounced(query, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
