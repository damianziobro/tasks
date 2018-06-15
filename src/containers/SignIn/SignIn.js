import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../store/actions';
import { isValid } from '../../shared/utility';

import Error from '../../components/UI/Error/Error';
import Loader from '../../components/UI/Loader/Loader';

import styles from './SignIn.css';

class SignIn extends Component {
    state = {
      form: {
        inputs: {
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
      const { isAuthenticated, history } = this.props;

      if (isAuthenticated) {
        history.push('/');
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
    }

    handleFormSubmit = (event) => {
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
      const { valid } = this.state.form;
      const { email, password } = this.state.form.inputs;
      const { signInError, isLoading } = this.props;

      return (
        <form onSubmit={this.handleFormSubmit} className={styles.form} autoComplete="off">
          <h2 className={styles.heading}>Sign In</h2>
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
          {signInError ? <Error errorMessage={signInError} /> : null}
          {isLoading ? <Loader /> : null}
          <input
            type="submit"
            value="Sign In"
            disabled={!valid}
            className={styles.submitBtn}
          />
        </form>
      );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  signInError: state.auth.signInError,
  isLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
