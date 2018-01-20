import selectElement from '../store/actions/selectElement'

export default [
  {
    path: '/about',
    action: 'TOGGLE_ABOUT',
    actionCreator: (getState, dispatch) => dispatch({type: 'TOGGLE_ABOUT', payload: true, triggerRedirect: false}),
    pathCreator: ({payload}) => `/${payload ? 'about' : ''}` // Creates path when action matches
  },
  {
    path: '/:atomicNumber',
    action: 'SELECT_ELEMENT',
    actionCreator: (getState, dispatch, {params: {atomicNumber}={}}) => selectElement(dispatch, +atomicNumber || null, false),
    pathCreator: ({atomicNumber}) => `/${atomicNumber || ''}`
  }
]
