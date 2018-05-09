import selectElement from '../store/actions/selectElement'

export default [
  {
    path: '/',
    action: null,
    actionCreator: (getState, dispatch) => dispatch({type: 'TOGGLE_ABOUT', payload: false, triggerRedirect: false})
                                        && dispatch({type: 'SELECT_ELEMENT', payload: null, triggerRedirect: false})
  },
  {
    path: '/about',
    action: 'TOGGLE_ABOUT',
    actionCreator: (getState, dispatch) => dispatch({type: 'TOGGLE_ABOUT', payload: true, triggerRedirect: false}),
    pathCreator: ({payload}, getState) => `/${payload ? 'about' : getState().periodicTable.selectedElement || ''}`
  },
  {
    path: '/:atomicNumber',
    action: 'SELECT_ELEMENT',
    actionCreator: (getState, dispatch, {params: {atomicNumber}={}}) => selectElement(dispatch, +atomicNumber || null, false),
    pathCreator: ({atomicNumber}, getState) => `/${atomicNumber || (getState().about ? 'about' : '')}`,
    dataSource: ({elements}) => elements.map(element => ({atomicNumber: element}))
  }
]
