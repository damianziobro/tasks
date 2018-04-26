import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthNav from '../../components/Auth/AuthNav/AuthNav';
import IsLogIn from '../../components/Auth/IsLogIn/IsLogIn';

class Auth extends Component {
    render() {
        let componentToRender = null;
        if (this.props.isAuthenticated) {
            componentToRender = <IsLogIn username={this.props.username}/>
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

export default connect(mapStateToProps)(Auth);