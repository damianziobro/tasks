import React from 'react';

import styles from './Error.css';

function Error({ errorMessage = 'Error' }) {
  return (
    <div className={styles.error}>
      {errorMessage}
    </div>
  );
}

export default Error;
