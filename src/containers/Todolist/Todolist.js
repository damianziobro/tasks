import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';
import { initTodos } from '../../store/actions';

class Todolist extends Component {
    state = {
        todoInputValue: ''
    }

    componentDidMount() {
        this.props.initTodos();
    }

    submitTodo = (event) => {
        event.preventDefault();

        const { todoInputValue } = this.state;
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
                <AddTodo value={todoInputValue} changeHandler={this.changeHandler} submitTodo={this.submitTodo}/>
                <TodolistComponent todos={this.props.todos} />
            </div>
        );
    }
}

  const mapStateToProps = state => {
    return {
        error: state.todos.error,
        todos: state.todos.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initTodos: () => dispatch(initTodos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);