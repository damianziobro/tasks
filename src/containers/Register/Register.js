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
        return (
            <form onSubmit={this.submitHandler}>
                <input name="username" type="text" placeholder="Username" value={username.value} onChange={this.changeHandler}/>
                <input name="email" type="email" placeholder="Email" value={email.value} onChange={this.changeHandler}/>
                <input name="password" type="password" placeholder="Password" value={password.value} onChange={this.changeHandler}/>
                <input type="submit" value="Register"/>
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