import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER} from '../constants/ActionTypes';
import v4 from 'uuid/v4';

export const addTodo = (text) => ({
    type: ADD_TODO,
    text: text,
    id: v4()
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
});

export const setVisibilityFilter = (filter) => ({
    type: SET_VISIBILITY_FILTER,
    filter
});