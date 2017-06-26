import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/TodoActions';

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