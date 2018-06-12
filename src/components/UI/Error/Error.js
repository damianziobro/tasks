import React from 'react';

function Error({ errorMessage = 'Error' }) {
  return (
    <div>
      {errorMessage}
    </div>
  );
}

export default Error;
