import axios from './axios'
import { LOAD_TASKS, LOGIN, LOGOUT, ERROR, TOKEN } from './constants'
import history from './history'

export function loadUser() {
  return async function(dispatch) {
    try {
      const response = await axios.get('/me')
      dispatch({ type: LOGIN, payload: response.data })
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem(TOKEN)
        dispatch({ type: LOGOUT })
      } else {
        dispatch({ type: ERROR, payload: err })
      }
    }
  }
}

export function login(email, password) {
  return async function(dispatch) {
    try {
      const response = await axios.post('/login', { email, password }) 
      const token = response.data.token
      const user = response.data.user
      localStorage.setItem(TOKEN, token)
      dispatch({ type: LOGIN, payload: user })
      history.push('/')
    } catch (err) {
      dispatch({ type: ERROR, payload: err })
    }
  }
}

export function loadTasks() {
  return async function(dispatch) {
    const response = await axios.get('/tasks')
    dispatch({ type: LOAD_TASKS, payload: response.data})
  }
}