import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';
import './index.css';
import store from './stores/TodoStore.js';


ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));

