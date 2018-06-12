import React from 'react';

import styles from './Logo.css';

import logo from '../../assets/img/logo.png';

function Logo() {
  return (
    <div className={styles.logo}>
      <h1 className={styles.heading}>To Do List</h1>
      <img className={styles.logoImg} src={logo} alt="Website logo" />
    </div>
  );
}

export default Logo;
