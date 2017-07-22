import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, RECEIVE_TODO } from '../constants/ActionTypes';
import v4 from 'uuid/v4';
import * as api from '../fakeBackend'


export const receiveTodo = (filter, reponse) => ({
    type: RECEIVE_TODO,
    filter,
    reponse,
});

export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(todos => receiveTodo(filter, todos));


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