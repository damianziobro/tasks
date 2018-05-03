import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../components/Logo/Logo';
import NotFound from '../../components/UI/NotFound/NotFound';
import MustBeLogged from '../../components/MustBeLogged/MustBeLogged';

import Auth from '../../containers/Auth/Auth';
import Todolist from '../../containers/Todolist/Todolist';
import Register from '../../containers/Register/Register';
import SignIn from '../../containers/SignIn/SignIn';

import { tryAutoSignIn } from '../../store/actions';

class Layout extends Component {

    componentDidMount() {
        this.props.onTryAutoSignIn();
    };

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div>
                <header>
                    <Logo />
                    <Auth />
                </header>
                <Switch>
                    <Route path="/" exact render={() => (isAuthenticated ? <Todolist /> : <MustBeLogged />)} />
                    <Route path="/register" component={Register} />
                    <Route path="/signin" component={SignIn} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignIn: () => dispatch(tryAutoSignIn())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));