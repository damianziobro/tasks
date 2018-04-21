import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register } from '../../store/actions';

class Register extends Component {
    state = {
        inputs: {
            username: '',
            email: '',
            password: ''
            }
    }

    changeHandler = (event) => {
        const inputs = {...this.state.inputs};
        inputs[event.target.name] = event.target.value;
        this.setState({inputs});
    }

    submitHandler = (event) => {
        event.preventDefault();
        
        const { username, email, password} = this.state.inputs;
        this.props.onRegister(username, email, password);
        this.setState({
            inputs: {
                username: '',
                email: '',
                password: ''
            }
        });
    }

    render () {
        const { username, email, password} = this.state.inputs;
        return (
            <form onSubmit={this.submitHandler}>
                <input name="username" type="text" placeholder="Nazwa uzytkownika" value={username} onChange={this.changeHandler}/>
                <input name="email" type="email" placeholder="E-mail" value={email} onChange={this.changeHandler}/>
                <input name="password" type="password" placeholder="Hasło" value={password} onChange={this.changeHandler}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: ( username, email, password ) => dispatch( register( username, email, password ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Register );