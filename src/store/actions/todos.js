import axios from '../../axiosBaseInstance';

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

export const error = () => ({
  type: ERROR,
});

export const setTodos = todos => ({
  type: SET_TODOS,
  todos,
});

export const fetchTodosStart = () => ({
  type: FETCH_TODOS_START,
});

export const setListId = id => ({
  type: SET_LIST_ID,
  id,
});

export const initTodos = () => (dispatch) => {
  dispatch(fetchTodosStart());
  const url = 'list';
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  axios.get(url, config)
    .then((response) => {
      dispatch(setTodos(response.data.data[0].tasks.data));
      dispatch(setListId(response.data.data[0].id));
    })
    .catch(() => {
      dispatch(error());
    });
};

export const addTodoStart = () => ({
  type: ADD_TODO_START,
});

export const setTodo = todo => ({
  type: SET_TODO,
  todo,
});

export const addTodoSuccess = () => ({
  type: ADD_TODO_SUCCESS,
});

export const addTodo = (todo, listId) => (dispatch) => {
  dispatch(addTodoStart());
  const url = `list/${listId}/task`;
  const data = {
    body: todo,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  axios.post(url, data, config)
    .then((response) => {
      dispatch(setTodo(response.data.data));
      dispatch(addTodoSuccess());
    })
    .catch((err) => {
      dispatch(error(err));
    });
};

const deleteTodoFromState = todoId => ({
  type: DELETE_TODO_FROM_STATE,
  todoId,
});

export const deleteTodo = (todoId, listId) => (dispatch) => {
  const url = `list/${listId}/task/${todoId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  axios.delete(url, config)
    .then(() => {
      dispatch(deleteTodoFromState(todoId));
    })
    .catch((err) => {
      dispatch(error(err));
    });
};
