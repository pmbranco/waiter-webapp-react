import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { AuthenticationActions } from '../../../actions';

class Signup extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    _handleSubmit() {
        this.dispatchWithLoader(AuthenticationActions.signup(this.state));
    }

    render() {
        console.log(this.state);
        return (
            <Card>
                <CardTitle
                    title="Welcome to Waiter"
                    subtitle="Skip the line"
                    style={style.headers}
                />
                <CardMedia style={style.inputStyle}>
                    <TextField
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={this.linkState("firstName")}
                    />
                    <br />
                    <TextField
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={this.linkState("lastName")}
                    />
                    <TextField
                        hintText="Email Address"
                        floatingLabelText="Email Adress"
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
                    <RaisedButton label="Signup" primary={true} style={style.buttonStyle} onTouchTap={this._handleSubmit.bind(this)}/>
                    <RaisedButton label="Cancel" primary={true} style={style.buttonStyle} />
                </CardActions>
            </Card>
        );
    }
}

export default connect(() => {
  return {};
})(Signup);