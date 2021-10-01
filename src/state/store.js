/* eslint-disable */
import React from 'react';

import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types';

const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();

const initState = {
  todos: [],
  currentTodo: '',
  isLoading: true,
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        currentTodo: '',
        todos: state.todos.concat(action.payload),
      };
    case LOAD_TODOS:
      return { ...state, todos: action.payload };
    case UPDATE_CURRENT:
      return { ...state, currentTodo: action.payload };
    case REPLACE_TODO:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case SHOW_LOADER:
    case HIDE_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

function TodosProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoDispatch() {
  const context = React.useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }

  return context;
}

function useTodoState() {
  const context = React.useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }

  return context;
}

export { TodosProvider, useTodoDispatch, useTodoState };
