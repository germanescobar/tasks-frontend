/* eslint-disable comma-dangle */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';

import createStore from '../store';
import App from '../App';
import server from './server';

let store;

beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test('allows user to login', async () => {
  // ejecución
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // validaciones
  await waitFor(() => screen.getByText(/Login/i));
  fireEvent.change(screen.getByTestId('email'), {
    target: { name: 'email', value: 'test@example.com' },
  });
  fireEvent.change(screen.getByTestId('password'), {
    target: { name: 'password', value: 'test1234' },
  });

  fireEvent.submit(screen.getByTestId('form'));

  await waitFor(() => {
    expect(screen.getAllByText(/lista de tareas/i).length).toBeGreaterThan(0);
    expect(localStorage.getItem('TOKEN')).not.toBeFalsy();
  });
});

test('shows error when user enters invalid credentials', async () => {
  server.use(
    rest.post(
      '/login',
      (req, res, ctx) =>
        res(
          ctx.status(401),
          ctx.json({
            error: 'invalid-credentials',
            message: 'Credenciales inválidas',
          })
        )
      // eslint-disable-next-line function-paren-newline
    )
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => screen.getByText(/Login/i));
  fireEvent.change(screen.getByTestId('email'), {
    target: { name: 'email', value: 'test@example.com' },
  });
  fireEvent.change(screen.getByTestId('password'), {
    target: { name: 'password', value: 'test1234' },
  });
  fireEvent.submit(screen.getByTestId('form'));

  expect(
    await screen.findByText(/credenciales inválidas/i)
  ).toBeInTheDocument();
  expect(localStorage.getItem('TOKEN')).toBeFalsy();
});
