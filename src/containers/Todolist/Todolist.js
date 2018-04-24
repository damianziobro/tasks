import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';
import { initTodos, addTodo } from '../../store/actions';

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

    changeHandler = (event) => {
        this.setState({todoInputValue: event.target.value});
    }

    render () {
        const { todoInputValue } = this.state;
        return (
            <div>
                <AddTodo value={todoInputValue} changeHandler={this.changeHandler} submitTodo={this.submitTodoHandler}/>
                <TodolistComponent todos={this.props.todos} />
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
        addTodo: (todoInputValue, listId) => dispatch(addTodo(todoInputValue, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);