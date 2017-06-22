import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';
import './index.css';
import store from './stores/TodoStore.js';

class Provider extends Component {

	getChildContext() {
		console.log('Provider store', this.props.store);
		return {
			store: this.props.store
		}
	}

	render() {
		return this.props.children;
	}
}

Provider.childContextTypes = {
	store: PropTypes.object
}

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>, 
	document.getElementById('root')
);

