import { updateObject } from '../../shared/utility';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, ERROR, SET_TODOS, FETCH_TODOS_START, SET_LIST_ID } from '../actions/todos';

const initialState = {
    todos: [],
    error: null,
    loading: false,
    listId: null
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

const setListId = (state, action) => {
    return updateObject(state, {listId: action.id});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_START: return fetchTodosStart(state, action);
        case SET_TODOS: return setTodos(state, action);
        case ERROR: return error(state, action);
        case SET_LIST_ID: return setListId(state, action);
        default:
            return state;
    }
};

export default reducer;