import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login as loginAction } from './actionCreators'
import auth from './auth'

function Login() {
  const dispatch = useDispatch()
  const [state, setState] = useState({ email: "", password: "" })

  const login = function(e) {
    e.preventDefault()

    const { email, password } = state
    // auth.login(dispatch, email, password)
    dispatch(loginAction(email, password))
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value

    const newState = { ...state }
    newState[name] = value

    setState(newState)
  }

  return (
    <form onSubmit={login}>
      <input type="text" name="email" value={state.email} onChange={handleChange} />
      <input type="text" name="password" value={state.password} onChange={handleChange} />
      <button type="submit">Ingresar</button>
    </form>
  )
}

export default Login