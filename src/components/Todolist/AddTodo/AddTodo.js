import React from 'react';

import arrow from '../../../assets/img/arrow.png';

import styles from './AddTodo.css';

function AddTodo({
  onAddTodoFormSubmit, onInputChange, value, valid,
}) {
  return (
    <form onSubmit={onAddTodoFormSubmit} className={styles.form}>
      <input
        type="text"
        value={value}
        onChange={onInputChange}
        placeholder="Add a task..."
        className={styles.input}
      />
      <input
        type="image"
        src={arrow}
        alt="Add task"
        value="Add"
        disabled={!valid}
        className={styles.submitBtn}
      />
    </form>
  );
}

export default AddTodo;
