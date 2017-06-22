import React, { Component, PropTypes } from 'react';

let todoId = 0;



//return多行元素可以要用括号括起来
const Todo = ({
  onClick,
  complete,
  text
}) => (
   <li  
    onClick={onClick}
    style={{
          textDecoration: complete ? 'line-through' : 'none'
         }}
    >
      {text}
    </li>
)


const TodoList = ({
  todos,
  onTodoClick,
}) => (
    <ul>
      {todos.map(todo => (
         <Todo 
          key={todo.id}
          {...todo}
          onClick={() => {
            onTodoClick(todo.id)
          }} />
      ))}
    </ul> 
);
class VisibleTodoList extends Component {

  //没有props和state的改变来触发组件更新，因此需要subscribe forceUpdate
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getVisibleTodos(
    todos,
    filter
  ) {
    switch(filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.complete);
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.complete);
    }
  }

  render() {
    const { store } = this.context;
    console.log(this.context);
    const {todos, visibilityFilter} = store.getState();
    const visibleTodos = this.getVisibleTodos(todos, visibilityFilter);

    return (
      <TodoList 
        todos={visibleTodos}
        onTodoClick={id => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }} />
    );
  }
}

VisibleTodoList.contextTypes = {
  store: PropTypes.object
}

function AddTodo(props, { store }) {
  let input;

  return (
    <div>
      <input 
        type="text" 
        ref={ node => { input = node; } } />
      <button onClick={ () => {
        store.dispatch({
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

AddTodo.contextTypes = {
  store: PropTypes.object
}

//pure component @param [props.., children]
const Link = (
  {
    active,
    onClick,
    children
  }
) => {
  if(active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#"
       onClick={e => {
            e.preventDefault();
            onClick();
          }} >
      {children}
    </a>
  );
}

class FilterLink extends Component {
  //没有props和state的改变来触发组件更新，因此需要subscribe forceUpdate
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {  
    const { store } = this.context;
    const filter = this.props.filter;
    const currentFilter = store.getState().visibilityFilter;

    return (
      <Link 
        active={filter === currentFilter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
          })
        }} >
        {this.props.children}
      </Link>
    );
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
}

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