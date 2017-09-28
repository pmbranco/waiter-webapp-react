import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { AppBar, Drawer, MenuItem, FontIcon } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white } from 'material-ui/styles/colors';

import LinkedComponent from './infrastructure/linked_component';
import Loader from './ui/base/loader';
import { LoaderActions, AuthenticationActions, UserActions } from './actions';

class App extends LinkedComponent {
  constructor() {
    super();
    this.state = {
      navOpen: false,
      userType: ""
    };
  }

  componentWillMount() {
    this.props.dispatch(LoaderActions.loader(true));
    this.props.dispatch(AuthenticationActions.init());
    this.setState({
      navOpen: false
    });
  }

  componentDidMount() {
    this.props.dispatch(LoaderActions.loader(false));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.authentication.get('token') && !(window.location.pathname === "/signin" || window.location.pathname === "/signup")) {
      this.redirect("/signin");
    }
    if (nextProps.authentication.get('userId') && nextProps.authentication.get('userId') !== this.props.authentication.get('userId')) {
      this.props.dispatch(UserActions.getUser(nextProps.authentication.get('userId')));
    }
    this.setState({userType: nextProps.userType ? "Switch to client" : "Switch to waiter"})
  }

  _toggle(e) {
    e.preventDefault();
    this.setState({
      navOpen: !this.state.navOpen
    })
  }

  _toggleType() {
    this.props.dispatch(UserActions.toggleUserType(!this.props.userType));
  }

  _navigate(path) {
    this.setState({
      navOpen: false
    });
    this.redirect(path)
  }

  _handleLogOut() {
      this.setState({
        navOpen: false
      });
      this.props.dispatch(AuthenticationActions.destroy());
      this.redirect("signin");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Waiter"
            onLeftIconButtonTouchTap={this._toggle.bind(this)}
          />
          <Drawer
            ref="LeftNav"
            docked={false}
            open={this.state.navOpen}
            onRequestChange={(open) => this.setState({ open })}
          >
            <AppBar
              title="Menu"
              iconElementRight={<FontIcon className="material-icons" color={white} style={{ marginRight: 24 }}>clear</FontIcon>}
              onRightIconButtonTouchTap={this._toggle.bind(this)}
              onLeftIconButtonTouchTap={this._toggle.bind(this)}
            />
            <MenuItem leftIcon={<FontIcon className="material-icons" >map</FontIcon>} onTouchTap={() => this._navigate('map')}>Map</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >event</FontIcon>} onTouchTap={() => this._navigate('events')}>Events</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >event</FontIcon>} onTouchTap={() => this._navigate('past_waits')}>Past Waits</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >account_circle</FontIcon>} onTouchTap={() => this._navigate('account')}>Account</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >security</FontIcon>} onTouchTap={() => this._navigate('security')}>Security</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >cached</FontIcon>} onTouchTap={this._toggleType.bind(this)}>{this.state.userType}</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >input</FontIcon>} onTouchTap={this._handleLogOut.bind(this)}>Log Out</MenuItem>
          </Drawer>
          <div className="content">
            {this.props.children}
          </div>
          <Loader show={this.props.loader.get("isPageLoading")} />
        </div>
      </MuiThemeProvider>
    )
  }
}

// TODO close the nav bar + style

export default connect((state) => {
  return {
    loader: state.loader,
    authentication: state.authentication,
    userType: state.user.get("isWaiter")
  }
})(App);