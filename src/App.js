import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from './components/Logo/Logo';
import NotFound from './components/UI/NotFound/NotFound';

import Auth from './containers/Auth/Auth';
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

  render() {
    const { isAuthenticated } = this.props;
    const { isUserTabbing } = this.state;

    return (
      <div
        className={isUserTabbing ? null : styles.removeFocus}
        onKeyDown={this.handleTabKeyClick}
      >
        <header className={styles.header}>
          <Logo />
          <Auth />
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
});

export default withRouter(connect(mapStateToProps)(App));
