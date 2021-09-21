import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  rest.get('/me', (req, res, ctx) => {
    return res(
      ctx.json({ 
        data: {
          email: "test@example.com",
          fistName: "Pedro",
          lastName: "Perez"
        }
      })
    )
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: "jdjdjdjd",
        user: {
          email: "test@example.com",
          fistName: "Pedro",
          lastName: "Perez"
        }
      })
    )
  }),
  rest.get('/tasks', (req, res, ctx) => {
    return res(ctx.json({ count: 1, page: 1, data: [{ title: "A", completed: false, id: "1234"}] }))
  })
]
const server = setupServer(...handlers)

export default server