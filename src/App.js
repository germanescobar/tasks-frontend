import  { Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Tasks from './Tasks'
import Login from './Login'
import Register from './Register'
import UploadImage from './UploadImage'
import PrivateRoute from './PrivateRoute'
import history from './history'
import { loadUser } from './actionCreators'
import "./App.css"
import { useEffect } from 'react'
import { LOGOUT, TOKEN } from './constants'

function Alert({ type="info", children }) {
  return <p className={`alert alert-${type}`}>{children}</p>
}

export default function App() {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      dispatch(loadUser())
    } else {
      dispatch({ type: LOGOUT })
    }
  }, [dispatch])

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Tasks} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/upload" component={UploadImage} />
        </Switch>
      </Router>

      { error ? <Alert type="error" >{error}</Alert> : null }
    </div>
  )
}
