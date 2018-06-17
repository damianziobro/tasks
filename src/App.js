import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from './store/actions';

import Logo from './components/Logo/Logo';
import NotFound from './components/UI/NotFound/NotFound';
import IsLogIn from './components/IsLogIn/IsLogIn';

import Todolist from './containers/Todolist/Todolist';
import Register from './containers/Register/Register';
import SignIn from './containers/SignIn/SignIn';

import styles from './App.css';

class App extends Component {
  state = {
    isUserTabbing: false,
  }

  handleTabKeyClick = (event) => {
    this.setState({ isUserTabbing: event.key === 'Tab' });
  }

  handleLogoutBtnClick = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  render() {
    const { isAuthenticated, username } = this.props;
    const { isUserTabbing } = this.state;

    return (
      <div
        className={isUserTabbing ? null : styles.removeFocus}
        onKeyDown={this.handleTabKeyClick}
      >
        <header className={styles.header}>
          <Logo />
          {isAuthenticated && <IsLogIn
            username={username}
            onLogoutBtnClick={this.handleLogoutBtnClick}
          />}
        </header>
        <main className={styles.main}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (isAuthenticated ? <Todolist /> : <Redirect to="/signin" />)}
            />
            <Route path="/register" component={Register} />
            <Route path="/signin" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
