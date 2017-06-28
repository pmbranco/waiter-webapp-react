import React, { Component } from 'react';
import { connect } from 'react-redux'

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { EventsActions } from '../../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


class EventShow extends LinkedComponent {
    constructor() {
        super();

        this.state = {
            event: {}
        }
    }

    componentWillMount() {
      this.props.dispatch(EventsActions.getOneEvent(this.props.params.id));
    }

    componentWillReceiveProps(nextProps) {
        this.state.event = nextProps.event;
    }

    render() {
        let event = this.state.event;
        return (
            <Card>
                <CardTitle
                    title="Event Show"
                    subtitle={"Detail de l'evenement " + event.name}
                    style={style.headers}
                />
            </Card>
        );
    }
}

export default connect((state) => {
  return {
      event: state.events.get("current")
  };
})(EventShow);
