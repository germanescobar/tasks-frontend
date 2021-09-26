/* eslint-disable no-underscore-dangle */
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTodos = () =>
  fetch(`${baseUrl}/api/tasks`).then((res) => res.json());
// .then(() => {
//   throw new Error('Boom!')
// })

export const createTodo = (title) =>
  fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, isComplete: false }),
  }).then((res) => res.json());
// .then(() => {
//   throw new Error('Boom!')
// })

export const updateTodo = (todo) =>
  fetch(`${baseUrl}/api/tasks/${todo._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const destroyTodo = (id) =>
  fetch(`${baseUrl}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
