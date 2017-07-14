import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'

const EventShowStyle = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { EventsActions, WaitActions, UserActions } from '../../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class EventShow extends LinkedComponent {
  constructor() {
    super();
    this.state = {
      code: "",
      event: {},
      refreshing: false,
      wait: {},
      numberToBook: 1,
      isBusy: 0,
      userId: "",
      isWaiter: 0
    }
  }

  componentWillMount() {
    const splitedPath = this.props.location.pathname.split("/"); // A utiliser voir si ca regle pas le pb du refresh
    console.log()
    this.eventId = this.props.params.id;
    this.state.isWaiter = this.props.isWaiter;
    this.dispatch([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.user._id, this.props.isWaiter ? 'waiter' : 'client')
    ]);
  }


  componentWillReceiveProps(nextProps) {
    this.state.event = nextProps.event;
    this.state.wait = nextProps.wait;
    this.state.isBusy = nextProps.user.waiterCurrentEvent ? 1 : 0;
    this.state.isWaiter = nextProps.isWaiter;
  }

  _onRefresh() {
    this.dispatch([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.user._id, this.state.isWaiter ? 'waiter' : 'client')
    ]);
  }

  _requestWait(event) {
    console.log(this.props.user._id + " " + event._id + " " + this.state.numberToBook)
    this.dispatch(WaitActions.requestWait(
      this.props.user._id,
      event._id,
      this.state.numberToBook
    ))/*
      .then(() => this._onRefresh);*/
  }

  _renderNotWaiter(event, wait, userId) {
    if (_.isEmpty(event)) {
      return (<div></div>)
    }
    if (wait._id && wait.eventId !== event._id) {
      return (
        <Card
          title="You can't request more than one wait"
        >
          <CardText style={EventShowStyle.textContainer}>
            Sadly, you can't request more that on wait at a time, at least fort now, come back later once your other wait is finished!
          </CardText>
        </Card>
      )
    }
    if (!event.listOfWaiters.length && _.isEmpty(wait)) {
      return (
        <Card
          title="No Waiter found"
        >
          <CardText style={EventShowStyle.textContainer}>
            Sadly, no waiter was found for this event :/
          </CardText>
          <CardText style={EventShowStyle.textContainer}>
            Swipe down no reload or come back later !
          </CardText>
        </Card>
      )
    } else if (_.isEmpty(wait)) {
      return (
        <Card
          title="Request a Wait"
        >
          <CardText style={EventShowStyle.textContainer}>Waiter to Request : {this.state.numberToBook}</CardText>
          {/*<Slider
            minimumValue={1}
            maximumValue={event.listOfWaiters.length}
            value={1}
            onValueChange={(value) => this.setState({ numberToBook: value })}
            step={1}
          />*/}
          <CardActions >
            <RaisedButton label="Request Wait" primary={true} onTouchTap={this._requestWait.bind(this, event)} />
          </CardActions>
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="Wait Requested"
          >
            <CardActions >
              <RaisedButton label="Your wait will begin soon" primary={true} disabled />
            </CardActions>
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in progress"
          >
            <CardActions >
              <RaisedButton label="Your wait is being taken care of" primary={true} disabled />
            </CardActions>
          </Card>)
      case 'queue-done':
        console.log(wait)
        if (wait.confirmationCode && wait.confirmationCode !== "") {
          return (
            <Card
              title="The Wait is over !"
            >
              <CardText style={EventShowStyle.textContainer}>Congratulation, be sure to give your waiter this code to finalise the transaction :</CardText>
              <CardText h4 style={EventShowStyle.textContainer}>{wait.confirmationCode}</CardText>
            </Card>
          )
        } else {
          this.dispatch(WaitActions.generateCode(wait._id, userId));
          return (
            <Card
              title="The Wait is over !"
            >
              <CardText style={EventShowStyle.textContainer}>Your code is generating and will be displayed in a bit :</CardText>
            </Card>
          )
        }
      default:
        return (
          <CardText>Not Waiter</CardText>
        )
    }
  }

  _register(event, userId) {
    this.dispatch(EventsActions.registerToEvent(event._id, userId))
      .then(() => this.dispatch(UserActions.getUser(userId)));
  }

  _unregister(event, userId) {
    this.dispatch(EventsActions.unregisterToEvent(event._id, userId))
      .then(() => this.dispatch(UserActions.getUser(userId)));
  }

  _queueStart(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-start"));
  }

  _queueDone(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-done"));
  }

  _validateCode(code, waitId, waiterId) {
    this.dispatch(WaitActions.validateCode(this.state.code, waitId, waiterId))
      .then(() => {
        this.setState({ isBusy: 0 });
      });
  }

  _renderWaiter(event, wait, userId) {
    console.log(wait);
    console.log(this.state.isBusy);
    if (!this.state.isBusy) {
      return (
        <Card
          title="You can register to this event"
        >
          <CardText style={EventShowStyle.textContainer}>Press this button to register</CardText>
          <CardActions >
            <RaisedButton label="Register" primary={true} onTouchTap={this._register.bind(this, event, userId)} />
          </CardActions>
        </Card>
      )
    } else if (_.isEmpty(wait)) {
      return (
        <Card
          title="You are now subscribed to this event"
        >
          <CardText style={EventShowStyle.textContainer}>You'll soon be requested for waiting :)</CardText>
          <CardActions >
            <RaisedButton label="Unsubscribe" primary={true} onTouchTap={this._unregister.bind(this, event, userId)} />
          </CardActions>
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="You have been requested !"
          >
            <CardText style={EventShowStyle.textContainer}>Press this button to let your client know that you begun waiting :)</CardText>
            <CardActions >
              <RaisedButton label="Start Waiting" primary={true} onTouchTap={this._queueStart.bind(this, wait._id, userId)} />
            </CardActions>
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in line !"
          >
            <CardText style={EventShowStyle.textContainer}>When you're done with you're wait, press this button to let your client know you've done your job</CardText>
            <CardActions >
              <RaisedButton label="My wait is over" primary={true} onTouchTap={this._queueDone.bind(this, wait._id, userId)} />
            </CardActions>
          </Card>)
      case 'queue-done':
        return (
          <Card
            title="Wait finished !"
          >
            <CardText style={EventShowStyle.textContainer}>Alright, great job, now don't forget to enter the code your client gave you in order to get paid \o/</CardText>
            <TextField
              hintText="Enter code here"
              floatingLabelText="code"
              value={this.state.code}
              onChange={this.linkState("code")}
            />
            <CardActions >
              <RaisedButton label="Confirm" primary={true} onTouchTap={this._validateCode.bind(this, this.state.code, wait._id, userId)} />
            </CardActions>
          </Card>)
      default:
        return (
          <CardText>Waiter</CardText>
        )
    }
  }

  render() {
    let event = this.state.event;
    let wait = this.state.wait;
    let isWaiter = this.state.isWaiter;
    console.log(this.state.isWaiter);
    return (
      <Card>
        <CardTitle
          title={event.name}
          subtitle={"Detail de l'evenement " + event.name}
          style={EventShowStyle.headers}
        />
        <CardActions>
          <RaisedButton label="Refresh" primary={true} onTouchTap={this._onRefresh.bind(this)} />
        </CardActions>
        <CardText
        >
          {event.description}
        </CardText>
        <CardText>
          {event.address}
        </CardText>
        {
          isWaiter ? this._renderWaiter(event, wait, this.props.user._id) : this._renderNotWaiter(event, wait, this.props.user._id)
        }
      </Card>
    );
  }
}

export default connect((state) => {
  return {
    event: state.events.get("current"),
    wait: state.wait.get("wait"),
    user: state.user.get("user"),
    isWaiter: state.user.get("isWaiter")
  };
})(EventShow);
