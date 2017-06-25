import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import { AppBar, Drawer, MenuItem, FontIcon } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white } from 'material-ui/styles/colors';

import LinkedComponent from './infrastructure/linked_component';

class App extends LinkedComponent {
  constructor() {
    super();
    this.state = {
      navOpen: false
    };
  }

  componentWillMount() {
    this.setState({
      navOpen: false
    });
  }

  _toggle(e) {
    e.preventDefault();
    this.setState({
      navOpen: !this.state.navOpen
    })
  }

  _navigate(path) {
    this.setState({
      navOpen: false
    });
    this.redirect(path)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Waiter coucou"
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
            />
            <MenuItem leftIcon={<FontIcon className="material-icons" >map</FontIcon>} onTouchTap={() => this._navigate('map')}>Map</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >event</FontIcon>} onTouchTap={() => this._navigate('events')}>Events</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >account_circle</FontIcon>} onTouchTap={() => this._navigate('account')}>Account</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >security</FontIcon>} onTouchTap={() => this._navigate('security')}>Security</MenuItem>
          </Drawer>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

// TODO close the nav bar + style

export default App