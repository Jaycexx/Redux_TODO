import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    onTodoClick: id => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}

function getVisibleTodos(todos, filter) {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.complete);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.complete);
  }
}
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList;