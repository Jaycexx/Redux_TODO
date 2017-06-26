import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER} from '../constants/ActionTypes';

let todoId = 0;

export const addTodo = (text) => ({
    type: ADD_TODO,
    text: text,
    id: todoId++
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
});

export const setVisibilityFilter = (filter) => ({
    type: SET_VISIBILITY_FILTER,
    filter
});