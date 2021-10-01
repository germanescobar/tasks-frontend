/* eslint-disable */
/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  getVisibleTodos,
} from '../state/actions';

import { useTodoDispatch, useTodoState } from '../state/store';

import TodoItem from './TodoItem';

const TodoList = (props) => {
  const { todos = [] } = useTodoState();

  const dispatch = useTodoDispatch();

  const onToggleTodo = (id) => {
    toggleTodo(dispatch, id, todos);
    fetchTodos(dispatch);
    // dispatch(toggleTodo(id));
    // dispatch(fetchTodos());
  };

  const onDeleteTodo = (id) => {
    // dispatch(deleteTodo(id));
    // dispatch(fetchTodos());
  };

  useEffect(() => {
    fetchTodos(dispatch);
  }, [dispatch]);

  return (
    <div className="Todo-List">
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};

/**
 * Typechecking props
 */
TodoList.propTypes = {
  filter: PropTypes.string,
};

TodoList.defaultProps = {
  filter: null,
};

export default TodoList;
