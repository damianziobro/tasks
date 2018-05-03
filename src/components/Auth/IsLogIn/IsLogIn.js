import React from 'react';

function IsLogIn({ username, onLogoutBtnClick }) {
    return (
        <div>
            <span>{`Logged in as: ${username}`}</span>
            <button onClick={onLogoutBtnClick}>Sign out</button>
        </div>
    );
};

export default IsLogIn;