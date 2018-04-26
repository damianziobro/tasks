import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthNav from '../../components/Auth/AuthNav/AuthNav';
import IsLogIn from '../../components/Auth/IsLogIn/IsLogIn';

import { logout } from '../../store/actions';

class Auth extends Component {
    logoutHandler = (event) => {
        this.props.logout();
    }

    render() {
        let componentToRender = null;
        if (this.props.isAuthenticated) {
            componentToRender = <IsLogIn username={this.props.username} logoutHandler={this.logoutHandler}/>
        } else {
            componentToRender = <AuthNav />
        }
        return componentToRender;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);