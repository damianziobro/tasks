import React from 'react';

function IsLogIn(props) {
    return (
        <div>
            <span>{`Logged in as: ${props.username}`}</span>
            <button onClick={props.logoutHandler}>Sign out</button>
        </div>
    );
};

export default IsLogIn;