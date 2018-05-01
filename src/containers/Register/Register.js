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

    componentDidUpdate() {
        const { isRegister, history } = this.props;
        if (isRegister) {
            history.push('/signin');
        }
    }

    render () {
        const { username, email, password } = this.state.form.inputs;
        const { valid } = this.state.form;
        
        return (
            <form onSubmit={this.submitHandler}>
                <h2>Create an account</h2>
                <label htmlFor="username">
                    Username
                    <input id="username" name="username" type="text" placeholder="Username" value={username.value} onChange={this.changeHandler} />
                </label>
                <label htmlFor="email">
                    Email
                    <input id="email" name="email" type="email" placeholder="Email" value={email.value} onChange={this.changeHandler} />
                </label>
                <label htmlFor="password">
                    Password
                    <input id="password" name="password" type="password" placeholder="Password" value={password.value} onChange={this.changeHandler} />
                </label>
                <input type="submit" value="Register" disabled={!valid} />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isRegister: state.auth.isRegister
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: ( username, email, password ) => dispatch( register( username, email, password ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Register );