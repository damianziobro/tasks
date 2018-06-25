import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import arrow from '../../../assets/img/arrow.png';

import styles from './AddTodo.css';

function AddTodo({
  errors,
  isSubmitting,
  touched,
}) {
  return (
    <div className={styles.formWrapper}>
      <Form className={styles.form}>
        <Field
          name="task"
          type="text"
          placeholder="Add a task..."
          className={styles.input}
        />
        <input
          type="image"
          src={arrow}
          alt="Add task"
          value="Add"
          disabled={isSubmitting}
          className={styles.submitBtn}
        />
      </Form>
      { touched.task && errors.task && <p className={styles.error}>{errors.task}</p> }
    </div>
  );
}

const AddTodoFormik = withFormik({
  mapPropsToValues() {
    return {
      task: '',
    };
  },
  validationSchema: Yup.object().shape({
    task: Yup.string().max(200).required(),
  }),
  handleSubmit(values, {
    props,
    setSubmitting,
    resetForm,
  }) {
    props.onAddTodo(values.task, props.listId);
    setSubmitting();
    resetForm();
  },
})(AddTodo);

export default AddTodoFormik;
