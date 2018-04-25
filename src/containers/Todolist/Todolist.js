import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';
import { initTodos, addTodo, deleteTodo } from '../../store/actions';
import { INIT_TODOS } from '../../store/actions/todos';

class Todolist extends Component {
    state = {
        todoInputValue: ''
    }

    componentDidMount() {
        this.props.initTodos();
    }

    submitTodoHandler = (event) => {
        event.preventDefault();

        const { todoInputValue } = this.state;

        this.props.addTodo(this.state.todoInputValue, this.props.listId);
        
        if (todoInputValue) {
            this.setState({todoInputValue: ''});
        }
    }

    deleteTodoHandler = (event) => {
        this.props.deleteTodo(event.target.id, this.props.listId);
    }

    changeHandler = (event) => {
        this.setState({todoInputValue: event.target.value});
    }

    checkedTodoHandler = (event) => {
        this.props.deleteTodo(event.target.id, this.props.listId);
    }

    render () {
        const { todoInputValue } = this.state;
        return (
            <div>
                <AddTodo value={todoInputValue} changeHandler={this.changeHandler} submitTodo={this.submitTodoHandler}/>
                <TodolistComponent todos={this.props.todos} deleteTodoHandler={this.deleteTodoHandler} checkedTodoHandler={this.checkedTodoHandler}/>
            </div>
        );
    }
}

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
        addTodo: (todoInputValue, listId) => dispatch(addTodo(todoInputValue, listId)),
        deleteTodo: (todoId, listId) => dispatch(deleteTodo(todoId, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);