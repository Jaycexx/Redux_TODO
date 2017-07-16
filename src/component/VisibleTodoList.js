import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/TodoActions';
import { withRouter } from 'react-router-dom';

//return多行元素可以要用括号括起来
const Todo = ({
  onClick,
  complete,
  text
}) => (
   <li  
    onClick={onClick}
    style={{
          textDecoration: complete ? 'line-through' : 'none'
         }}
    >
      {text}
    </li> 
)

const TodoList = ({
  todos,
  onTodoClick,
}) => (
    <ul>
      {todos.map(todo => (
         <Todo 
          key={todo.id}
          {...todo}
          onClick={() => {
            onTodoClick(todo.id)
          }} />
      ))}
    </ul> 
);

const mapStateToProps = (state, { location }) => ({
    todos: getVisibleTodos(state.todos, location.pathname.slice(1) || 'all')
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(
        toggleTodo(id)
      )
    }
});

function getVisibleTodos(todos, filter) {
  console.log('filter:', filter);
  switch(filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => !todo.complete);
    case 'completed':
      return todos.filter(todo => todo.complete);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;