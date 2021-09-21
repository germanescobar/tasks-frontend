import { render, screen, waitFor, fireEvent, findByAltText } from '@testing-library/react';
import { Provider } from 'react-redux';
import history from '../history'
import { rest } from 'msw'
import createStore from '../store'
import { TOKEN } from '../constants'
import App from '../App'
import server from './server'

let store;
beforeEach(() => {
  localStorage.clear()
  store = createStore()
})

test('allows user to login', async () => {
  history.push('/login')

  // ejecución
  render(<Provider store={store}><App /></Provider>);

  // validaciones
  await waitFor(() => screen.getByText(/Login/i))
  fireEvent.change(screen.getByTestId('email'), { target: { name: "email", value: "test@example.com" }})
  fireEvent.change(screen.getByTestId('password'), {target: { name: "password", value: "test1234" }})

  fireEvent.submit(screen.getByTestId("form"))

  await waitFor(() => {
    expect(screen.getAllByText(/lista de tareas/i).length).toBeGreaterThan(0)
    expect(localStorage.getItem(TOKEN)).not.toBeFalsy()
  })
})

test('shows error when user enters invalid credentials', async () => {
  server.use(rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({error: 'invalid-credentials', message: 'Credenciales inválidas'}))
  }))

  history.push('/login')

  render(<Provider store={store}><App /></Provider>);

  await waitFor(() => screen.getByText(/Login/i))
  fireEvent.change(screen.getByTestId('email'), { target: { name: "email", value: "test@example.com" }})
  fireEvent.change(screen.getByTestId('password'), {target: { name: "password", value: "test1234" }})
  fireEvent.submit(screen.getByTestId("form"))

  expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument()
  expect(localStorage.getItem(TOKEN)).toBeFalsy()
})