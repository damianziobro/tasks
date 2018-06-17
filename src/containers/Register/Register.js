import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../store/actions';
import { isValid } from '../../shared/utility';

import Error from '../../components/UI/Error/Error';
import Loader from '../../components/UI/Loader/Loader';

import styles from './Register.css';

class Register extends Component {
    state = {
      form: {
        inputs: {
          username: {
            value: '',
            validation: {
              required: true,
            },
            valid: false,
          },
          email: {
            value: '',
            validation: {
              required: true,
              isEmail: true,
            },
            valid: false,
          },
          password: {
            value: '',
            validation: {
              required: true,
              minLength: 8,
            },
            valid: false,
          },
        },
        valid: false,
      },
    };

    componentDidUpdate() {
      const { isRegistered, history } = this.props;

      if (isRegistered) {
        history.push('/signin');
      }
    }

    handleInputChange = (event) => {
      const form = { ...this.state.form };
      const inputs = { ...this.state.form.inputs };
      const input = {
        ...inputs[event.target.name],
      };

      input.value = event.target.value;
      input.valid = isValid(input.value, input.validation);
      inputs[event.target.name] = input;

      let formIsValid = true;
      for (const inputIdentifier in inputs) {
        formIsValid = inputs[inputIdentifier].valid && formIsValid;
      }

      form.inputs = inputs;
      form.valid = formIsValid;

      this.setState({ form });
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
                required: true,
              },
              valid: false,
            },
            email: {
              value: '',
              validation: {
                required: true,
                isEmail: true,
              },
              valid: false,
            },
            password: {
              value: '',
              validation: {
                required: true,
                minLength: 8,
              },
              valid: false,
            },
          },
          valid: false,
        },
      });
    };

    render() {
      const { username, email, password } = this.state.form.inputs;
      const { valid } = this.state.form;
      const { registerError, isLoading } = this.props;

      return (
        <form onSubmit={this.handleFormSubmit} className={styles.form} autoComplete="off">
          <h2 className={styles.heading}>Create an account</h2>
          <label htmlFor="username" className={styles.label}>
                    Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your username goes here"
              value={username.value}
              onChange={this.handleInputChange}
              className={styles.input}
            />
          </label>
          <label htmlFor="email" className={styles.label}>
                    Email
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your e-mail goes here"
              value={email.value}
              onChange={this.handleInputChange}
              className={styles.input}
            />
          </label>
          <label htmlFor="password" className={styles.label}>
                    Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password goes here"
              value={password.value}
              onChange={this.handleInputChange}
              className={styles.input}
            />
          </label>
          {registerError ? <Error errorMessage={registerError.message} /> : null}
          {isLoading ? <Loader /> : null}
          <input
            type="submit"
            value="Register"
            disabled={!valid}
            className={styles.submitBtn}
          />
          <span className={styles.redirect}>
            Already have an account?
            <Link to="/signin" className={styles.redirectLink}>
              Sign In
            </Link>
          </span>
        </form>
      );
    }
}

const mapStateToProps = state => ({
  isRegistered: state.auth.isRegistered,
  registerError: state.auth.registerError,
  isLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, email, password) => dispatch(register(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
