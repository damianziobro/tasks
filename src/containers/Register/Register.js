import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register } from '../../store/actions';
import { isValid } from '../../shared/utility';

class Register extends Component {

    state = {
        form: {
            inputs: {
                 username: {
                     value: '',
                     validation: {
                         required: true
                     },
                     valid: false
                 },
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

    componentDidUpdate() {
        const { isRegistered, history } = this.props;

        if (isRegistered) {
            history.push('/signin');
        };
    };

    handleInputChange = (event) => {
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
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, email, password } = this.state.form.inputs;

        this.props.onRegister(username.value, email.value, password.value);

        this.setState({
            form: {
                inputs: {
                     username: {
                         value: '',
                         validation: {
                             required: true
                         },
                         valid: false
                     },
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

    render() {
        const { username, email, password } = this.state.form.inputs;
        const { valid } = this.state.form;
        
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h2>Create an account</h2>
                <label htmlFor="username">
                    Username
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username.value}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email.value}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password.value}
                        onChange={this.handleInputChange}
                    />
                </label>
                <input
                    type="submit"
                    value="Register"
                    disabled={!valid}
                />
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isRegistered: state.auth.isRegistered
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (username, email, password) => dispatch(register(username, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);