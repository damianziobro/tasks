import {
  updateObject,
} from '../../shared/utility';

import {
  ERROR,
  SET_TODOS,
  FETCH_TODOS_START,
  SET_LIST_ID,
  ADD_TODO_START,
  SET_TODO,
  ADD_TODO_SUCCESS,
  DELETE_TODO_FROM_STATE,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_START,
} from '../actions/todos';

const initialState = {
  todos: [],
  error: null,
  loading: false,
  listId: null,
  addTodoLoading: false,
  deleteTodoLoading: false,
};

const fetchTodosStart = state => updateObject(state, { loading: true });

const setTodos = (state, action) => updateObject(state, { todos: action.todos });

const error = state => updateObject(state, { error: true });

const setListId = (state, action) => updateObject(state, { listId: action.id });

const addTodoStart = state => updateObject(state, { addTodoLoading: true });

const setTodo = (state, action) => {
  const todos = [...state.todos];
  todos.push(action.todo);
  return updateObject(state, { todos });
};

const addTodoSuccess = state => updateObject(state, { addTodoLoading: false });

const deleteTodoFromState = (state, action) => {
  const oldTodos = [...state.todos];
  const newTodos = oldTodos.filter(todo => todo.id !== Number(action.todoId));
  return updateObject(state, { todos: newTodos });
};

const deleteTodoStart = state => updateObject(state, { deleteTodoLoading: true });

const deleteTodoSuccess = state => updateObject(state, { deleteTodoLoading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_START: return fetchTodosStart(state, action);
    case SET_TODOS: return setTodos(state, action);
    case ERROR: return error(state, action);
    case SET_LIST_ID: return setListId(state, action);
    case ADD_TODO_START: return addTodoStart(state, action);
    case SET_TODO: return setTodo(state, action);
    case ADD_TODO_SUCCESS: return addTodoSuccess(state, action);
    case DELETE_TODO_FROM_STATE: return deleteTodoFromState(state, action);
    case DELETE_TODO_START: return deleteTodoStart(state, action);
    case DELETE_TODO_SUCCESS: return deleteTodoSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
