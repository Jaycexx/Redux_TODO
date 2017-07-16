import { combineReducers, createStore } from 'redux';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import todo from './todo';
//多个reducer的场景


// selectors
const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

// 操作所有todos
const byId = (state = {}, action) => {
  switch(action.type) {
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
// 操作所有的todos id
const allIds = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  };
};

const todoApp = combineReducers({
  byId,
  allIds,
});
const initialState = loadState();
console.log('initialState', initialState);
const store = createStore(todoApp, initialState);

store.subscribe(throttle(() => {
  console.log('save state');
  saveState({
    todos: store.getState().todos
  });
}, 1000));

export default store;
export const getVisibleTodos = (state, filter) => {
  const todos = getAllTodos(state);
  console.log('filter:', filter);
  switch(filter) {
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