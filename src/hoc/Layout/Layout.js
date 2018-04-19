import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Logo from '../../components/Logo/Logo';
import Auth from '../../components/Auth/Auth';
import NotFound from '../../components/UI/NotFound/NotFound';

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
            <Switch>
                <Route path="/" exact component={Todolist}/>
                <Route path="/register" component={Register}/>
                <Route path="/signin" component={SignIn}/>
                <Route component={NotFound}/>
             </Switch>
            </div>
        );
    }
}

export default Layout;