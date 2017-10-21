import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

export default typeof window === 'object' ? createBrowserHistory() : createMemoryHistory()
