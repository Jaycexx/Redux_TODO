import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/TodoActions';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../stores/TodoStore.js';
import TodoList from './TodoList';
import { fetchTodos } from '../fakeBackend'
//return多行元素可以要用括号括起来

class VisibleTodoList extends Component {
  componentDidMount() {
    this.getTodos();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.getTodos();
    }
  }

  getTodos() {
    const { filter, receiveTodo } = this.props;
    fetchTodos(filter).then(todos => {
      receiveTodo(filter, todos);
    });
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />
  }
}

const mapStateToProps = (state, { location }) => {
  const filter = location.pathname.slice(1) || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};
// 自动封装了diapatch的action
// const mapDispatchToProps = (dispatch) => ({
//   ...actions
// });


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;