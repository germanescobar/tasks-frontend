import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { LOGIN, LOGOUT, LOAD_TASKS, ERROR, LOADING, AUTHENTICATED, NOT_AUTHENTICATED } from './constants'

const initialState = {
  auth: {
    status: LOADING,
    user: null,
  },
  tasks: [],
  error: null
}

const reducer = function(state=initialState, action) {
  if (action.type === LOGIN) {
    return { ...state, auth: { 
      status: AUTHENTICATED,
      user: action.payload 
    }}
  } else if (action.type === LOGOUT) {
    return { ...state, auth: { status: NOT_AUTHENTICATED, user: null } }
  } else if (action.type === ERROR) {
    const error = action.payload
    let msg = "Encontramos un error desconocido, intena nuevamente o comu ..."
    if (error.name === "NetworkError") {
      msg = "Encontra ..."
    } else if (error.response) {
      if (error.response.status === 401) {
        msg = error.response.data.message
      }
    }
    return { ...state, error: msg }
  }else if (action.type === LOAD_TASKS) {
    return { ...state, tasks: action.payload }
  }
  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))