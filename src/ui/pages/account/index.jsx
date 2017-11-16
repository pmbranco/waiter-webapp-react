import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

const style = require('./style.js').default;
import { UserActions } from '../../../actions';

import LinkedComponent from '../../../infrastructure/linked_component';

class Account extends LinkedComponent {
    constructor() {
        super();
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
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

    componentWillMount() {
      if (this.props.user) {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email
        });
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            firstName: nextProps.user.firstName,
            lastName: nextProps.user.lastName,
            email: nextProps.user.email
        });
    }

    _handleSubmit() {
        this.dispatchWithLoader(UserActions.updateUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
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
                        hintText="First Name"
                        floatingLabelText="First Name"
                        value={this.state.firstName}
                        onChange={this.linkState("firstName")}
                    />
                    <br />
                    <TextField
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        value={this.state.lastName}
                        onChange={this.linkState("lastName")}
                    />
                    <br />
                    <TextField
                        hintText="Email address"
                        floatingLabelText="Email address"
                        value={this.state.email}
                        onChange={this.linkState("email")}
                    />
                </CardMedia>
                <CardActions style={style.headers}>
                    <RaisedButton label="Update" primary={true} style={style.buttonStyle} onTouchTap={this._handleSubmit.bind(this)}/>
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
                                    <br/>
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
})(Account);