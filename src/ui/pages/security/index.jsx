import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';

class Security extends LinkedComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <Card>
                <CardMedia style={style.inputStyle}>
                    <TextField
                        hintText="Current Password"
                        floatingLabelText="Current Password"
                        type="password"
                    />
                    <br />
                    <TextField
                        hintText="New Password"
                        floatingLabelText="New Password"
                        type="password"
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Save" primary={true} style={style.buttonStyle} />
                </CardActions>
            </Card>
        );
    }
}

export default Security;