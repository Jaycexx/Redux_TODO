import React from 'react';
import VisibleTodoList from './component/VisibleTodoList';
import AddTodo from './component/AddTodo';
import Footer from './component/Footer'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;