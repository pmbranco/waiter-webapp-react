import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = require('./style.js').default;
import { UserActions } from '../../../actions';

import LinkedComponent from '../../../infrastructure/linked_component';
import Dialog from 'material-ui/Dialog';

class Security extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            newPassword: "",
            password: "",
            open: false,
            causes: []
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    _handleSubmit() {
        this.dispatchWithLoader(UserActions.updatePassword({
            password: this.state.password,
            newPassword: this.state.newPassword,
            userId: this.props.user._id
        }))
            .catch((err) => {
                this.setState({
                    open: true,
                    causes: err.data.causes
                })
            });
    }

    render() {
        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <Card style={{margin: "100px", padding: "20px"}}>
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
                    <RaisedButton label="Save" primary={true} style={style.buttonStyle} onTouchTap={this._handleSubmit.bind(this)} />
                </CardActions>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    There has been an error with your credentials, please try again.
                <br />
                    <br />
                    {
                        this.state.causes.map((err, index) => {
                            return (
                                <div key={index}>
                                    {err}
                                    <br />
                                </div>
                            )
                        })
                    }
                </Dialog>
            </Card>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user.get("user")
    };
})(Security);