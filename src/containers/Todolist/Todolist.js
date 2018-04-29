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
            this.props.initTodos();
    };

    submitTodoHandler = (event) => {
        event.preventDefault();

        const { listId } = this.props;
        const { value } = this.state.todo;

        this.props.addTodo(value, listId);

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

    deleteTodoHandler = (event) => {
        this.props.deleteTodo(event.target.id, this.props.listId);
    };

    changeHandler = (event) => {
        const todo = { ...this.state.todo };
        
        todo.value = event.target.value;
        todo.valid = isValid(todo.value, todo.validation);

        let newValid = false;
        if (todo.valid) {
            newValid = true;
        };

        this.setState({ todo: todo, valid: newValid });
    };

    checkedTodoHandler = (event) => {
        this.props.deleteTodo(event.target.id, this.props.listId);
    };

    render () {
        const { value, valid } = this.state.todo;
        const { todos } = this.props;

        return (
            <div>
                <AddTodo value={value} changeHandler={this.changeHandler} submitTodo={this.submitTodoHandler} valid={valid} />
                <TodolistComponent todos={todos} deleteTodoHandler={this.deleteTodoHandler} checkedTodoHandler={this.checkedTodoHandler} />
            </div>
        );
    };
};

  const mapStateToProps = state => {
    return {
        error: state.todos.error,
        todos: state.todos.todos,
        listId: state.todos.listId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initTodos: () => dispatch(initTodos()),
        addTodo: (todo, listId) => dispatch(addTodo(todo, listId)),
        deleteTodo: (todoId, listId) => dispatch(deleteTodo(todoId, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);