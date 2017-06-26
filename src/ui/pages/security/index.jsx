import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;
import { UserActions } from '../../../actions';

import LinkedComponent from '../../../infrastructure/linked_component';

class Security extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            newPassword: "",
            password: ""
        }
    }

    _handleSubmit() {
        this.dispatchWithLoader(UserActions.updatePassword({
            password: this.state.password,
            newPassword: this.state.newPassword,
            userId: this.props.user._id
        }))
    }

    render() {
        return (
            <Card>
                <CardMedia style={style.inputStyle}>
                    <TextField
                        hintText="Current Password"
                        floatingLabelText="Current Password"
                        type="password"
                        onChange={this.linkState("password")}
                    />
                    <br />
                    <TextField
                        hintText="New Password"
                        floatingLabelText="New Password"
                        type="password"
                        onChange={this.linkState("newPassword")}
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Save" primary={true} style={style.buttonStyle} onTouchTap={this._handleSubmit.bind(this)}/>
                </CardActions>
            </Card>
        );
    }
}

export default connect((state) => {
  return {
      user: state.user.get("user")
  };
})(Security);