import React from 'react';
import { Link } from 'react-router-dom';

function Auth (props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/signin">Zaloguj się</Link>
                </li>
                <li>
                    <Link to="/register">Zarejestruj się</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Auth;