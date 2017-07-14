import React, { Component } from 'react';
import { connect } from 'react-redux'

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { EventsActions } from '../../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import EventMiniature from './event_miniature.jsx';

class Events extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            events: []
        }
    }

    componentWillMount() {
      this.props.dispatch(EventsActions.getAllEvents());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            events: nextProps.events
        });
    }

    _renderEvents(events) {
        if (!events || events.length === 0) {
            return (
                <div> no events founds </div>
            )
        }
        const children = events.map((event, index) => {
          console.log("lol");
          console.log(event);
            return (
                <EventMiniature
                    event={event}
                    handleViewPress={this._handleEventView.bind(this, event._id)}
                    key={`EventMiniature_${index}`}
                />
            )
        })
        return children;
    }

    _handleEventView(eventId) {
        console.log("la je me redirige vers : ", eventId);
        this.redirect(`/events/${eventId}`);
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title="Events page"
                    subtitle="List les events disponibles"
                    style={style.headers}
                />
                <CardMedia style={style.inputStyle}>
                    {this._renderEvents(this.state.events)}
                </CardMedia>
            </Card>
        );
    }
}

export default connect((state) => {
  return {
      events: state.events.get("events")
  };
})(Events);
