import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { LOGIN, LOAD_TASKS, SAVE_TASK } from './actions'

const initialState = {
  user: null,
  tasks: [],
}

const reducer = function (state = initialState, action) {
  if (action.type === LOGIN) {
    return { ...state, user: action.payload }
  } else if (action.type === LOAD_TASKS) {
    return { ...state, tasks: action.payload }
  } else if (action.type === SAVE_TASK) {
    return { ...state, tasks: state.tasks.concat(action.payload) }
  }
  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)
