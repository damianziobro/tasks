import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../store/actions';

class SignIn extends Component {
    state = {
        inputs: {
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

        const { email, password } = this.state.inputs;
        this.props.onSignIn(email, password);
        this.props.history.push('/');
        this.setState({
            inputs: {
                email: '',
                password: ''
            }
        });
    }

    render () {
        const { email, password} = this.state.inputs;
        return (
            <form onSubmit={this.submitHandler}>
                <input name="email" type="text" placeholder="E-mail" value={email} onChange={this.changeHandler} />
                <input name="password" type="password" placeholder="Hasło" value={password} onChange={this.changeHandler} />
                <input type="submit" value="Submit" />
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
        onSignIn: ( email, password ) => dispatch( signIn( email, password ) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);