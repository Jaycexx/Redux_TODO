import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

let todoId = 0;

function AddTodo({ dispatch }) {
  let input;

  return (
    <div>
      <input 
        type="text" 
        ref={ node => { input = node; } } />
      <button onClick={ () => {
        dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: todoId++
        })
        input.value = '';
      } }>
        add Todo
      </button>
    </div>
  );
}

export default AddTodo = connect()(AddTodo);