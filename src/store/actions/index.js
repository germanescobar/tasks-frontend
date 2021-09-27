/* eslint-disable */
/* eslint-disable no-debugger */
/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { createActions } from 'redux-actions';

import {
  getTodos,
  createTodo,
  updateTodo,
  destroyTodo,
} from '../../lib/todoServices';

import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../types';

// FSA - FLUX STANDARD ACTION
// {
//   type: '',
//   payload: '',
//   error: true,
//   meta: {},
// }

const fixCase = (str) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;

export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader,
} = createActions(
  {
    [UPDATE_CURRENT]: fixCase,
    [SHOW_LOADER]: () => true,
    [HIDE_LOADER]: () => false,
    [ADD_TODO]: [(val) => val, (_, title) => ({ title })],
  },
  LOAD_TODOS,
  REPLACE_TODO,
  REMOVE_TODO
);

export const fetchTodos = () => async (dispatch) => {
  dispatch(showLoader());

  try {
    const { data } = await getTodos();
    dispatch(loadTodos(data));
  } catch (error) {
    dispatch(loadTodos(error));
  } finally {
    dispatch(hideLoader());
  }
};

export const saveTodo = (title) => async (dispatch) => {
  dispatch(showLoader());

  try {
    const res = await createTodo(title);
    dispatch(addTodo(res));
  } catch (error) {
    dispatch(addTodo(error, title));
  } finally {
    dispatch(hideLoader());
  }
};

export const toggleTodo = (id) => async (dispatch, getState) => {
  dispatch(showLoader());
  const { todos } = getState();
  const todo = todos.find((t) => t._id === id);
  const toggled = { ...todo, completed: !todo.completed };

  try {
    const res = await updateTodo(toggled);
    dispatch(replaceTodo(res));
  } catch (error) {
    console.log('Show', error);
  } finally {
    dispatch(hideLoader());
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch(showLoader());

  try {
    await destroyTodo(id);
    dispatch(removeTodo(id));
  } catch (error) {
    console.log('Show', error);
  } finally {
    dispatch(hideLoader());
  }
};

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};
