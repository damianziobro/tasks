import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../store/actions';
import { isValid } from '../../shared/utility';

class SignIn extends Component {
    state = {
       form: {
           inputs: {
                email: {
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false
                },
                password: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 8
                    },
                    valid: false
                }
           },
           valid: false
        }
       };

    changeHandler = (event) => {
        const form = { ...this.state.form };
        const inputs = { ...this.state.form.inputs };
        const input = {
            ...inputs[event.target.name]
        };

        input.value = event.target.value;
        input.valid = isValid(input.value, input.validation);
        inputs[event.target.name] = input;

        let formIsValid = true;
        for (let inputIdentifier in inputs) {
            formIsValid = inputs[inputIdentifier].valid && formIsValid;
        }

        form.inputs = inputs;
        form.valid = formIsValid;

        this.setState({ form: form });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { email, password } = this.state.form.inputs;

        this.props.onSignIn(email.value, password.value);

        this.setState({
            form: {
                inputs: {
                     email: {
                         value: '',
                         validation: {
                             required: true,
                             isEmail: true
                         },
                         valid: false
                     },
                     password: {
                         value: '',
                         validation: {
                             required: true,
                             minLength: 8
                         },
                         valid: false
                     }
                },
                valid: false
             }
        });
    };

    componentDidUpdate() {
        const { isAuthenticated, history } = this.props;
        
        if (isAuthenticated) {
            history.push('/');
        }
    }

    render () {
        const { valid } = this.state.form;
        const { email, password } = this.state.form.inputs;
        const error = this.props.error ? <span>Try again</span> : null;
        
        return (
            <form onSubmit={this.submitHandler}>
                <h2>Sign In</h2>
                <label htmlFor="email">
                    Email
                    <input id="email" name="email" type="email" placeholder="E-mail" value={email.value} onChange={this.changeHandler} />
                </label>
                <label htmlFor="password">
                    Password
                    <input id="password" name="password" type="password" placeholder="Password" value={password.value} onChange={this.changeHandler} />
                </label>
                {error}
                <input type="submit" value="Sign In" disabled={!valid} />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.signInError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(signIn(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);