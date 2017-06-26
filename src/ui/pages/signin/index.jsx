import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { AuthenticationActions, UserActions } from '../../../actions';

class Signin extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }
    }


    _handleSubmit() {
        this.dispatchWithLoader(AuthenticationActions.create(this.state))
        .then(() => this.dispatchWithLoader(UserActions.getUser(this.props.userId)))
        .then(() => this.redirect("/events"));
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title="Welcome to Waiter"
                    subtitle="Skip the line"
                    style={style.headers}
                />
                <CardMedia style={style.inputStyle}>
                    <TextField
                        hintText="Email Address"
                        floatingLabelText="Email Address"
                        onChange={this.linkState("email")}
                    />
                    <br />
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        onChange={this.linkState("password")}
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Login" primary={true} style={style.buttonStyle} onTouchTap={this._handleSubmit.bind(this)}/>
                    <RaisedButton 
                        label="Signup" 
                        primary={true} 
                        style={style.buttonStyle}
                        onTouchTap={() => this.redirect('signup')}
                    />
                </CardActions>
            </Card>
        );
    }
}

export default connect((state) => {
  return {
      userId: state.authentication.get("userId")
  };
})(Signin);