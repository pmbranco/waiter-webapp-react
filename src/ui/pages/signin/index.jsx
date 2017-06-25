import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';

class Signin extends LinkedComponent {
    constructor() {
        super();
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
                    />
                    <br />
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Login" primary={true} style={style.buttonStyle} />
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

export default Signin;