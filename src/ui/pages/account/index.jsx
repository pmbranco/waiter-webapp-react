import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;

class Account extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Card>
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
                    <br />
                    <TextField
                        hintText="Email address"
                        floatingLabelText="Email address"
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Update" primary={true} style={style.buttonStyle} />
                </CardActions>
            </Card>
        );
    }
}

export default Account;