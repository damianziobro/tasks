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
        const { email, password } = { ...inputs };
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

        form['inputs'] = inputs;
        form['valid'] = formIsValid;

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
        return (
            <form onSubmit={this.submitHandler}>
                <input name="email" type="email" placeholder="E-mail" value={email.value} onChange={this.changeHandler} />
                <input name="password" type="password" placeholder="Hasło" value={password.value} onChange={this.changeHandler} />
                <input type="submit" value="Submit" disabled={!valid} />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(signIn(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);