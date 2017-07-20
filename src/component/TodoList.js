import React from 'react';

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
);

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

export default TodoList;