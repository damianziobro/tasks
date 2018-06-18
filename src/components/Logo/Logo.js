import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';

import logo from '../../assets/img/logo.png';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img className={styles.logoImg} src={logo} alt="Website logo" />
      <h1 className={styles.heading}>Tasks</h1>
    </Link>
  );
}

export default Logo;
