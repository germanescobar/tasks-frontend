import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login as loginAction } from './actionCreators';

function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const login = (e) => {
    e.preventDefault();

    const { email, password } = state;
    dispatch(loginAction(email, password));
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    const newState = {
      ...state,
    };
    newState[name] = value;

    setState(newState);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={login} data-testid="form">
        <input
          type="text"
          name="email"
          data-testid="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          data-testid="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}

export default Login;
