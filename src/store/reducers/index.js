/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
/* eslint-disable */
import { handleActions, combineActions } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../types';

const initState = {
  todos: [],
  currentTodo: '',
  isLoading: true,
  message: '',
};

const reducer = handleActions(
  {
    [ADD_TODO]: {
      next: (state, action) => ({
        ...state,
        currentTodo: '',
        todos: state.todos.concat(action.payload),
      }),
      throw: (state, action) => ({
        ...state,
        message: `There was a problem saving the todo ${action.meta.title}`,
      }),
    },
    [LOAD_TODOS]: {
      next: (state, action) => ({ ...state, todos: action.payload }),
      throw: (state, action) => ({ ...state, message: action.payload.message }),
    },
    [UPDATE_CURRENT]: (state, action) => ({
      ...state,
      currentTodo: action.payload,
    }),
    [REPLACE_TODO]: (state, action) => ({
      ...state,
      todos: state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      ),
    }),
    [REMOVE_TODO]: (state, action) => ({
      ...state,
      todos: state.todos.filter((t) => t.id !== action.payload),
    }),
    [combineActions(SHOW_LOADER, HIDE_LOADER)]: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
  initState
);

export default reducer;
