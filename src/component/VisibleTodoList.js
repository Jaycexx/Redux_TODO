import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/TodoActions';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../stores/TodoStore.js';
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
    todos: getVisibleTodos(state, location.pathname.slice(1) || 'all')
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(
        toggleTodo(id)
      )
    }
});


const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;