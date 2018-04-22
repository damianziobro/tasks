import { updateObject } from '../../shared/utility';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, ERROR, SET_TODOS, FETCH_TODOS_START } from '../actions/todos';

const initialState = {
    todos: [],
    error: null,
    loading: false
};

const fetchTodosStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const setTodos = (state, action) => {
    return updateObject(state, {todos: action.todos});
};

const error = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_START: return fetchTodosStart(state, action);
        case SET_TODOS: return setTodos(state, action);
        case ERROR: return error(state, action);
        default:
            return state;
    }
};

export default reducer;