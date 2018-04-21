import React, {Component} from 'react';
// import { connect } from 'react-redux';

import AddTodo from '../../components/Todolist/AddTodo/AddTodo';
import TodolistComponent from '../../components/Todolist/Todolist';

class Todolist extends Component {
    state = {
        todoInputValue: ''
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

//   const mapStateToProps = state => {
//     return {
       
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
        
//     };
// };


// export default connect( mapStateToProps, mapDispatchToProps )( Todolist );
export default Todolist;