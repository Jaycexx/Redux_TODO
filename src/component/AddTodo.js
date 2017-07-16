import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/TodoActions';

let AddTodo = ({ dispatch }) => {
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