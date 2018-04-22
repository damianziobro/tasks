import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const ERROR = 'ERROR';
export const SET_TODOS = 'SET_TODOS';
export const INIT_TODOS = 'INIT_TODOS';
export const FETCH_TODOS_START = 'FETCH_TODOS_START';

export const addTodo = () => {
    return {
        type: ADD_TODO
    }
};

export const updateTodo = () => {
    return {
        type: UPDATE_TODO
    }
};

export const deleteTodo = () => {
    return {
        type: DELETE_TODO
    }
};

export const error = (error) => {
    return {
        type: ERROR
    }
};

export const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        todos: todos
    }
};

export const fetchTodosStart = () => {
    return {
        type: FETCH_TODOS_START
    }
}

export const initTodos = () => {
    return dispatch => {
        dispatch(fetchTodosStart());
        let url = 'http://138.68.84.92/api/list';
        let config = {
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
        axios.get(url, config)
        .then(response => {
            dispatch(setTodos(response.data.data[0].tasks.data));
        })
        .catch(err => {
            dispatch(error(err));
        });
    };
};