import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import { AppBar, Drawer, MenuItem, FontIcon } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white } from 'material-ui/styles/colors';

class App extends Component {
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

  _navigate(path, history) {
    this.setState({
      navOpen: false
    });
    history.push(path)
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
            <MenuItem leftIcon={<FontIcon className="material-icons" >map</FontIcon>} onTouchTap={() => this._navigate('map', this.props.history)}>Map</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >event</FontIcon>} onTouchTap={() => this._navigate('events', this.props.history)}>Events</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >account_circle</FontIcon>} onTouchTap={() => this._navigate('account', this.props.history)}>Account</MenuItem>
            <MenuItem leftIcon={<FontIcon className="material-icons" >security</FontIcon>} onTouchTap={() => this._navigate('security', this.props.history)}>Security</MenuItem>
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