import { store } from './store'
import axios from './axios'

async function login(email, password) {
  const response = await axios.post('/login', { email, password }) 
  const token = response.data.token
  const user = response.data.user
  localStorage.setItem("token", token)
  store.dispatch({ type: "LOGIN", payload: user })
}

export default { login }