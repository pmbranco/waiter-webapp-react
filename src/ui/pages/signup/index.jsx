import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

class Signup extends Component {
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
                        hintText="First Name"
                        floatingLabelText="First Name"
                    />
                    <br />
                    <TextField
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                    />
                    <TextField
                        hintText="Email Address"
                        floatingLabelText="Email Adress"
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
                    <RaisedButton label="Signup" primary={true} style={style.buttonStyle} />
                </CardActions>
            </Card>
        );
    }
}

export default Signup;