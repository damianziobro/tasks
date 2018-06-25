import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';
import Loader from '../../components/UI/Loader/Loader';

import { initTodos, addTodo, deleteTodo } from '../../store/actions';

class Todolist extends Component {
  componentDidMount() {
    const { onInitTodos } = this.props;
    onInitTodos();
  }

  handleDeleteTodo = (event) => {
    const { onDeleteTodo, listId } = this.props;

    onDeleteTodo(event.target.id, listId);
  };

  handleCompleteTodo = (event) => {
    const { onDeleteTodo, listId } = this.props;

    onDeleteTodo(event.target.id, listId);
  };

  render() {
    const {
      todos,
      addTodoLoading,
      deleteTodoLoading,
      onAddTodo,
      listId,
    } = this.props;

    return (
      <div>
        <AddTodo
          onAddTodo={onAddTodo}
          listId={listId}
        />
        <TodolistComponent
          todos={todos}
          onDeleteTodo={this.handleDeleteTodo}
          onCompleteTodo={this.handleCompleteTodo}
          deleteTodoLoading={deleteTodoLoading}
        />
        {addTodoLoading && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = ({
  todos: {
    error,
    todos,
    listId,
    addTodoLoading,
    deleteTodoLoading,
  },
}) => ({
  error,
  todos,
  listId,
  addTodoLoading,
  deleteTodoLoading,
});

const mapDispatchToProps = dispatch => ({
  onInitTodos: () => dispatch(initTodos()),
  onAddTodo: (todo, listId) => dispatch(addTodo(todo, listId)),
  onDeleteTodo: (todoId, listId) => dispatch(deleteTodo(todoId, listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
