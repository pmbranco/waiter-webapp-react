import React, { Component } from 'react';

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class EventMiniature extends LinkedComponent {
    constructor() {
        super();

    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const event = this.props.event;
        return (
            <Card>
                <CardTitle
                    title="Je suis un event"
                    subtitle={event.name}
                />
                <CardActions >
                    <RaisedButton label="View" primary={true} onTouchTap={this.props.handleViewPress.bind(this, event._id)}/>
                </CardActions>
            </Card>
        );
    }
}

export default EventMiniature;
