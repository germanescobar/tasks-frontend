/* eslint-disable */
/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  getVisibleTodos,
} from '../store/actions';

import TodoItem from './TodoItem';

const TodoList = (props) => {
  const todos =
    useSelector((state) => getVisibleTodos(state.todos, props.filter)) || [];

  const dispatch = useDispatch();

  const onToggleTodo = (id) => {
    dispatch(toggleTodo(id));
    dispatch(fetchTodos());
  };

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    dispatch(fetchTodos());
  };

  useEffect(() => {
    dispatch(fetchTodos());
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
