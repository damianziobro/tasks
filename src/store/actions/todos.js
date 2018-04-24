import axios from 'axios';

export const UPDATE_TODO = 'UPDATE_TODO';
export const ERROR = 'ERROR';
export const SET_TODOS = 'SET_TODOS';
export const INIT_TODOS = 'INIT_TODOS';
export const FETCH_TODOS_START = 'FETCH_TODOS_START';
export const SET_LIST_ID = 'SET_LIST_ID';
export const ADD_TODO_START = 'ADD_TODO_START';
export const SET_TODO = 'SET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_FROM_STATE = 'DELETE_TODO_FROM_STATE';

export const updateTodo = () => {
    return {
        type: UPDATE_TODO
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

export const setListId = (id) => {
    return {
        type: SET_LIST_ID,
        id: id
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
            dispatch(setListId(response.data.data[0].id));
        })
        .catch(err => {
            dispatch(error(err));
        });
    };
};

export const addTodoStart = () => {
    return {
        type: ADD_TODO_START
    }
}

export const setTodo = (todo) => {
    return {
        type: SET_TODO,
        todo: todo
    }
}

export const addTodoSuccess = () => {
    return {
        type: ADD_TODO_SUCCESS
    }
}

export const addTodo = (todo, listId) => {
    return dispatch => {
        dispatch(addTodoStart());
        let url = `http://138.68.84.92/api/list/${listId}/task`;
        let data = {
            body: todo
        };
        let config = {
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        };

        axios.post(url, data, config)
        .then(response => {
            dispatch(setTodo(response.data.data));
            dispatch(addTodoSuccess());
        })
        .catch(err => {
            dispatch(error(err));
        });
    };
};

const deleteTodoFromState = (todoId) => {
    return {
        type: DELETE_TODO_FROM_STATE,
        todoId: todoId
    };
};

export const deleteTodo = (todoId, listId) => {
    return dispatch => {
        let url = `http://138.68.84.92/api/list/${listId}/task/${todoId}`;
        let config = {
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        };

        axios.delete(url, config)
        .then(response => {
            dispatch(deleteTodoFromState(todoId));
        })
        .catch(err => {
            dispatch(error(err));
        });
    };
};