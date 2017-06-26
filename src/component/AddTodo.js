import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/TodoActions';

let todoId = 0;

function AddTodo({ dispatch }) {
  let input;

  return (
    <div>
      <input 
        type="text" 
        ref={ node => { input = node; } } />
      <button onClick={ () => {
        dispatch(
          addTodo(input.value)
        )
        input.value = '';
      } }>
        add Todo
      </button>
    </div>
  );
}

export default AddTodo = connect()(AddTodo);