import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';

import { initTodos, addTodo, deleteTodo } from '../../store/actions';
import { isValid } from '../../shared/utility';

class Todolist extends Component {

    state = {
        todo: {
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    };

    componentDidMount() {
        this.props.onInitTodos();
    };

    handleAddTodoFormSubmit = (event) => {
        event.preventDefault();

        const { listId, onAddTodo } = this.props;
        const { value } = this.state.todo;

        onAddTodo(value, listId);

        this.setState({ 
            todo: {
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            valid: false
        });
    };

    handleDeleteTodo = (event) => {
        const { onDeleteTodo, listId } = this.props;

        onDeleteTodo(event.target.id, listId);
    };

    handleInputChange = (event) => {
        const todo = { ...this.state.todo };
        
        todo.value = event.target.value;
        todo.valid = isValid(todo.value, todo.validation);

        let formValid = false;
        if(todo.valid) {
            formValid = true;
        };

        this.setState({ todo, valid: formValid });
    };

    handleCompleteTodo = (event) => {
        const { onDeleteTodo, listId } = this.props;

        onDeleteTodo(event.target.id, listId);
    };

    render() {
        const { value, valid } = this.state.todo;
        const { todos } = this.props;

        return (
            <div>
                <AddTodo
                    value={value}
                    onInputChange={this.handleInputChange}
                    onAddTodoFormSubmit={this.handleAddTodoFormSubmit}
                    valid={valid}
                />
                <TodolistComponent
                    todos={todos}
                    onDeleteTodo={this.handleDeleteTodo}
                    onCompleteTodo={this.handleCompleteTodo}
                />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        error: state.todos.error,
        todos: state.todos.todos,
        listId: state.todos.listId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitTodos: () => dispatch(initTodos()),
        onAddTodo: (todo, listId) => dispatch(addTodo(todo, listId)),
        onDeleteTodo: (todoId, listId) => dispatch(deleteTodo(todoId, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);