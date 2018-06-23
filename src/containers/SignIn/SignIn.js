import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { signIn, tryAutoSignIn } from '../../store/actions';

import Loader from '../../components/UI/Loader/Loader';

import styles from './SignIn.css';

class SignIn extends Component {
  componentWillMount() {
    const { onTryAutoSignIn } = this.props;
    onTryAutoSignIn();
  }

  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;

    if (isAuthenticated) {
      history.push('/');
    }
  }

  render() {
    const {
      isLoading,
      errors,
      touched,
      isSubmitting,
    } = this.props;

    return (
      <Form className={styles.form}>
        <h2 className={styles.heading}>Sign In</h2>
        <label htmlFor="email" className={styles.label}>
          Email
          <Field
            name="email"
            type="email"
            placeholder="Your e-mail goes here"
            className={styles.input}
          />
          { touched.email && errors.email && <p className={styles.error}>{errors.email}</p> }
        </label>
        <label htmlFor="password" className={styles.label}>
          Password
          <Field
            name="password"
            type="password"
            placeholder="Your password goes here"
            className={styles.input}
          />
          {
            touched.password
            && errors.password
            && <p className={styles.error}>{errors.password}</p>
          }
        </label>
        {isLoading && <Loader />}
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          Sign In
        </button>
        <span className={styles.redirect}>
            No account?
          <Link to="/register" className={styles.redirectLink}>
              Create an account
          </Link>
        </span>
      </Form>
    );
  }
}

const mapStateToProps = ({ signIn: { isAuthenticated, error, isLoading } }) => ({
  isAuthenticated,
  error,
  isLoading,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (values, setErrors, setSubmitting) =>
    dispatch(signIn(values, setErrors, setSubmitting)),
  onTryAutoSignIn: () => dispatch(tryAutoSignIn()),
});


const SignInFormik = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  }),
  handleSubmit(values, {
    props, setSubmitting, setErrors,
  }) {
    props.onSignIn(values, setErrors, setSubmitting);
  },
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormik);
