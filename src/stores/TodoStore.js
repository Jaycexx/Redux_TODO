import { combineReducers, createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import todo from './todo';



//多个reducer的场景
// selectors
const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

// [reducer]操作所有todos
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    default:
      return state;
  }
}
// [reducer]操作所有的todos id
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  };
};
// @middleware
const addLoggingToDispatch = store => next => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    // chrome console api可以设置输出的样式
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const retValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return retValue;
  };
}

const addPromiseSupport = store => next => {
  return action => {
    if(typeof action.then === 'function') {
      return action.then(next);
    }
    return next(action);
  }
}

const configureStore = () => {

  const todoApp = combineReducers({
    byId,
    allIds,
  });
  
  const initialState = loadState();
  console.log('initialState', initialState);
  const store = createStore(
    todoApp, 
    initialState,
    applyMiddleware(
      addPromiseSupport,
      addLoggingToDispatch,
    )
  );
  // js是在Nodejs环境里面编译再输出到浏览器，所以可以访问process对象
  // if (process.env.NODE_ENV !== 'production') {
  //   console.log('process:', process);
  //   store.dispatch = addLoggingToDispatch(store);
  // }

  // store.dispatch = addPromiseSupport(store);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
}

const store = configureStore();


export default store;

export const getVisibleTodos = (state, filter) => {
  const todos = getAllTodos(state);
  console.log('filter:', filter);
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => !todo.complete);
    case 'completed':
      return todos.filter(todo => todo.complete);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};;