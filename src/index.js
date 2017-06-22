import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TodoApp from './App';
import './index.css';
import store from './stores/TodoStore.js';

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>, 
	document.getElementById('root')
);

