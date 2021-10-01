/* eslint-disable no-underscore-dangle */
import {
  getTodos,
  // createTodo,
  updateTodo,
  // destroyTodo,
} from '../lib/todoServices';

import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types';

export const updateCurrent = (val) => ({ type: UPDATE_CURRENT, payload: val });
export const loadTodos = (todos) => ({ type: LOAD_TODOS, payload: todos });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const replaceTodo = (todo) => ({ type: REPLACE_TODO, payload: todo });
export const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });
export const showLoader = () => ({ type: SHOW_LOADER, payload: true });
export const hideLoader = () => ({ type: HIDE_LOADER, payload: false });

export const fetchTodos = async (dispatch) => {
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

export const toggleTodo = async (dispatch, id, todos) => {
  dispatch(showLoader());
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
