import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VisibleTodoList from './component/VisibleTodoList';
import AddTodo from './component/AddTodo';
import FilterLink from './component/FilterLink';

const Footer = () => (
  <p>
    show: 
      <FilterLink 
        filter="SHOW_ALL" >
          All
      </FilterLink>
      {', '}
      <FilterLink 
        filter="SHOW_ACTIVE" >
          Active
      </FilterLink>
      {', '}
      <FilterLink 
        filter="SHOW_COMPLETED" >
          Completed
      </FilterLink>
  </p>
);



class TodoApp extends Component {

  constructor(props) {
    super(props);
  } 

  render() {

    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
  
}

export default TodoApp; 