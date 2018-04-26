import React from 'react';

function IsLogIn(props) {
    return (
        <div>
            <span>{`Zalogowany jako: ${props.username}`}</span>
            <button onClick={props.logoutHandler}>Wyloguj</button>
        </div>
    );
}

export default IsLogIn;