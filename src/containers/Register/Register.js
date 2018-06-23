import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { register } from '../../store/actions';

import Loader from '../../components/UI/Loader/Loader';

import styles from './Register.css';

class Register extends Component {
  componentDidUpdate() {
    const { isRegistered, history } = this.props;

    if (isRegistered) {
      history.push('/signin');
    }
  }

  render() {
    // error import
    const {
      isLoading,
      errors,
      touched,
      isSubmitting,
    } = this.props;

    return (
      <Form className={styles.form}>
        <h2 className={styles.heading}>Create an account</h2>
        <label htmlFor="username" className={styles.label}>
          Username
          <Field
            name="username"
            type="username"
            placeholder="Your username goes here"
            className={styles.input}
          />
          {
            touched.username &&
            errors.username &&
            <p className={styles.error}>{errors.username}</p>
          }
        </label>
        <label htmlFor="email" className={styles.label}>
          Email
          <Field
            name="email"
            type="email"
            placeholder="Your e-mail goes here"
            className={styles.input}
          />
          {
            touched.email &&
            errors.email &&
            <p className={styles.error}>{errors.email}</p>
          }
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
            touched.password &&
            errors.password &&
            <p className={styles.error}>{errors.password}</p>
          }
        </label>
        {isLoading && <Loader />}
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          Register
        </button>
        <span className={styles.redirect}>
          Already have an account?
          <Link to="/signin" className={styles.redirectLink}>
              Sign In
          </Link>
        </span>
      </Form>
    );
  }
}

const mapStateToProps = ({ register: { isRegistered, error, isLoading } }) => ({
  isRegistered,
  error,
  isLoading,
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, email, password) => dispatch(register(username, email, password)),
});


const RegisterFormik = withFormik({
  mapPropsToValues() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().max(30).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  }),
  handleSubmit({ username, email, password }, { props, resetForm, setSubmitting }) {
    props.onRegister(username, email, password);
    resetForm();
    setSubmitting();
  },
})(Register);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormik);
