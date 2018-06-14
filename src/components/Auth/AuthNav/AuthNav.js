import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AuthNav.css';

function AuthNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navElement}>
          <NavLink className={styles.link} to="/signin">
            Sign In
          </NavLink>
        </li>
        <li className={styles.navElement}>
          <NavLink className={styles.link} to="/register">
                        Create an account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
