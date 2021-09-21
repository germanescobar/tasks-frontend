// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import server from './tests/server'

beforeAll(() => {
  server.listen({
    onUnhandledRequest: ({ method, url }) => {
      if (method !== "OPTIONS") {
        throw new Error(`Unhandled ${method} request to ${url}`);
      }
    }
  })
})

afterEach(() => {
  // removes the handlers added on each test
  server.resetHandlers() 
})

afterAll(() => {
  server.close()
})