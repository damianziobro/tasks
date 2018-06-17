import React from 'react';

import styles from './Logo.css';

import logo from '../../assets/img/logo.png';

function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <img className={styles.logoImg} src={logo} alt="Website logo" />
      <h1 className={styles.heading}>Tasks</h1>
    </a>
  );
}

export default Logo;
