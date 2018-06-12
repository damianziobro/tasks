import React from 'react';

import styles from './IsLogIn.css';

function IsLogIn({ username, onLogoutBtnClick }) {
  return (
    <div className={styles.container}>
      <span className={styles.loggedInAs}>
                Logged in as:
        <span className={styles.username}>
          {username}
        </span>
      </span>
      <button className={styles.logoutBtn} onClick={onLogoutBtnClick}>
                Sign out
      </button>
    </div>
  );
}

export default IsLogIn;
