import {createBrowserHistory} from 'history'
import {createMemoryHistory} from 'history'

export default typeof window === 'object' ? createBrowserHistory() : createMemoryHistory()
