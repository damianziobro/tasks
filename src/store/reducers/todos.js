import { updateObject } from '../../shared/utility';
import { UPDATE_TODO, DELETE_TODO, ERROR, SET_TODOS, FETCH_TODOS_START, SET_LIST_ID, ADD_TODO_START, SET_TODO, ADD_TODO_SUCCESS } from '../actions/todos';

const initialState = {
    todos: [],
    error: null,
    loading: false,
    listId: null,
    addTodoLoading: false
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

const addTodoStart = (state, action) => {
    return updateObject(state, {addTodoLoading: true})
}

const setTodo = (state, action) => {
    const todos = [...state.todos];
    todos.push(action.todo);
    return updateObject(state, {todos: todos});
}

const addTodoSuccess = (state, action) => {
    return updateObject(state, {addTodoLoading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_START: return fetchTodosStart(state, action);
        case SET_TODOS: return setTodos(state, action);
        case ERROR: return error(state, action);
        case SET_LIST_ID: return setListId(state, action);
        case ADD_TODO_START: return addTodoStart(state, action);
        case SET_TODO: return setTodo(state, action);
        case ADD_TODO_SUCCESS: return addTodoSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;