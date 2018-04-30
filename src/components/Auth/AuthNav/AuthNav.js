import React from 'react';
import { Link } from 'react-router-dom';

function AuthNav(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li>
                    <Link to="/register">Create an account</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AuthNav;