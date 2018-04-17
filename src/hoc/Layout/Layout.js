import React, {Component} from 'react';

import Logo from '../../components/Logo/Logo';
import Auth from '../../components/Auth/Auth';
import Todolist from '../../containers/Todolist/Todolist';

class Layout extends Component {
    render () {
        return (
            <div>
            <header>
                <Logo />
                <Auth />
            </header>
            <Todolist />
            </div>
        );
    }
}

export default Layout;