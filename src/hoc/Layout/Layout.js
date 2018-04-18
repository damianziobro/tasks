import React, {Component} from 'react';

import Logo from '../../components/Logo/Logo';
import Auth from '../../components/Auth/Auth';
import Todolist from '../../containers/Todolist/Todolist';

import Register from '../../containers/Register/Register';
import SignIn from '../../containers/SignIn/SignIn';

class Layout extends Component {
    render () {
        return (
            <div>
            <header>
                <Logo />
                <Auth />
            </header>
            <Todolist />
            <Register />
            <SignIn />
            </div>
        );
    }
}

export default Layout;