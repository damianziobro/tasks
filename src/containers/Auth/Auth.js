import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthNav from '../../components/Auth/AuthNav/AuthNav';
import IsLogIn from '../../components/Auth/IsLogIn/IsLogIn';

import { logout } from '../../store/actions';

class Auth extends Component {

    handleLogoutBtnClick = () => {
        this.props.logout();
    };

    render() {
        const { isAuthenticated, username } = this.props;

        if (isAuthenticated) {
            return <IsLogIn username={username} onLogoutBtnClick={this.handleLogoutBtnClick} />;
        }
        return <AuthNav />;
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);