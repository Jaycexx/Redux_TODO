import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import TodoApp from './App';
import './index.css';
import store from './stores/TodoStore.js';

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<TodoApp />
		</HashRouter>
	</Provider>, 
	document.getElementById('root')
);

