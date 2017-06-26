import { combineReducers, createStore } from 'redux';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
//多个reducer的场景
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': 
      return {
          id: action.id,
          text: action.text,
          complete: false,
        };
    case 'TOGGLE_TODO': 
        if(state.id === action.id) {
          return {
            ...state,
            complete: !state.complete,
          };
        }
        return state;
    default: 
      return state;
  }
}
// todos operation reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': 
      console.log('ADD_TODO');
      return [
        ...state, 
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO': 
      console.log('TOGGLE_TODO');
      return state.map( t => todo(t, action));
    default: 
      return state;
  }
};
//visibilityFilter reducer
const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      console.log('SET_VISIBILITY_FILTER');
      return action.filter;
    default:
      return state;
  }
}


const todoApp = combineReducers({
  todos,
  visibilityFilter,
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