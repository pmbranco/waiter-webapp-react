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
            <Card style={{margin: "10px"}}>
                <CardTitle
                    title={event.name}
                    subtitle={event.description}
                />
                <CardText>
                    {event.address}
                </CardText>
                <CardText>
                    There currently is {event.listOfWaiters.length} available for this event.
                </CardText>
                <CardActions >
                    <RaisedButton label="View" primary={true} onTouchTap={this.props.handleViewPress.bind(this, event._id)}/>
                </CardActions>
            </Card>
        );
    }
}

export default EventMiniature;
