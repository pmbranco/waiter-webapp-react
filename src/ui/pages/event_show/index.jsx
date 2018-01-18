"use strict"

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'

const EventShowStyle = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { EventsActions, WaitActions, UserActions } from '../../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Rating from 'react-rating';

// if (process.env !== "BROWSER") {
//   return;
// }

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
      isWaiter: 0,
      rated: false,
      starCount: 3,
      fixDegeu: 3
    }
  }

  componentWillMount() {
    const splitedPath = this.props.location.pathname.split("/"); // A utiliser voir si ca regle pas le pb du refresh
    this.eventId = this.props.params.id;
    this.state.isWaiter = this.props.isWaiter;
    if (process.env === "BROWSER") {
      console.log("coucou putain");
      this.dispatch([
        EventsActions.getOneEvent(this.eventId),
        WaitActions.getCurrentWait(this.props.user._id, this.props.isWaiter ? 'waiter' : 'client')
      ]);
    }
  }

  componentDidMount() {
    const splitedPath = this.props.location.pathname.split("/"); // A utiliser voir si ca regle pas le pb du refresh
    this.eventId = this.props.params.id;
    console.log("coucou");
    console.log(this.props.params.id);
    this.state.isWaiter = this.props.isWaiter;
    if (process.env === "BROWSER") {
      this.dispatch([
        EventsActions.getOneEvent(this.eventId),
        WaitActions.getCurrentWait(this.props.user._id, this.props.isWaiter ? 'waiter' : 'client')
      ]);
    }
  }

  _onSubmitRating() {
    this.setState({
      rated: true
    })
  }

  componentWillReceiveProps(nextProps) {
    // this.state.event = nextProps.event;
    // this.state.wait = nextProps.wait;
    // this.state.isBusy = nextProps.user.waiterCurrentEvent ? 1 : 0;
    // this.state.isWaiter = nextProps.isWaiter;
    this.setState({
      event: nextProps.event,
      wait : nextProps.wait,
      isBusy : nextProps.user.waiterCurrentEvent ? 1 : 0,
      isWaiter : nextProps.isWaiter
    });
  }

  _onRefresh() {
    this.dispatch([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.user._id, this.state.isWaiter ? 'waiter' : 'client')
    ]);
  }

  _requestWait(event) {
    this.dispatch(WaitActions.requestWait(
      this.props.user._id,
      event._id,
      this.state.numberToBook
    ))
      .then(() => this.dispatch(WaitActions.getCurrentWait(this.props.user._id, this.state.isWaiter ? 'waiter' : 'client')))
  }

  handleSlider = (event, value) => {
    this.setState({ numberToBook: value });
  };

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
    if (event.listOfWaiters != undefined && !event.listOfWaiters.length && _.isEmpty(wait)) {
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
          <Slider
            min={0}
            max={event.listOfWaiters != undefined ? event.listOfWaiters.length : 0}
            step={1}
            value={this.state.numberToBook}
            onChange={this.handleSlider}
          />
          <CardActions style={EventShowStyle.buttonContainer}>
            <RaisedButton disabled={this.state.numberToBook ? false : true} label="Request Wait" primary={true} onTouchTap={this._requestWait.bind(this, event)} />
          </CardActions>
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="Wait Requested"
          >
            <CardActions style={EventShowStyle.buttonContainer}>
              <RaisedButton label="Your wait will begin soon" primary={true} disabled />
            </CardActions>
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in progress"
          >
            <CardActions style={EventShowStyle.buttonContainer}>
              <RaisedButton label="Your wait is being taken care of" primary={true} disabled />
            </CardActions>
          </Card>)
      case 'queue-done':
        if (wait.confirmationCode && wait.confirmationCode !== "" && this.state.rated !== false) {
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
              <CardText style={EventShowStyle.textContainer}>Rate your waiter to see your code :</CardText>
              <CardActions style={EventShowStyle.buttonContainer}>
                <Rating
                  start={0}
                  stop={5}
                  step={1}
                  initialRate={this.state.starCount}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this._onStarRatingPress(rating)}
                  style={{ paddingVertical: 10 }}
                />
              </CardActions>
              <CardActions style={EventShowStyle.buttonContainer}>
                <RaisedButton label="Submit Rating" primary={true} onTouchTap={this._onSubmitRating.bind(this)} />
              </CardActions>
            </Card>
          )
        }
      default:
        this._onRefresh();
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
      .then(() => this.dispatch(UserActions.getUser(userId)))
  }

  _queueStart(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-start"))
      .then(() => this.dispatch(WaitActions.getCurrentWait(this.props.user._id, this.state.isWaiter ? 'waiter' : 'client')))
  }

  _queueDone(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-done"))
      .then(() => this.dispatch(WaitActions.getCurrentWait(this.props.user._id, this.state.isWaiter ? 'waiter' : 'client')))
  }

  _validateCode(code, waitId, waiterId) {
    this.dispatch(WaitActions.validateCode(this.state.code, waitId, waiterId))
      .then(() => {
        this.setState({ isBusy: 0, wait: {} });
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
          <CardActions style={EventShowStyle.buttonContainer}>
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
          <CardActions style={EventShowStyle.buttonContainer}>
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
            <CardActions style={EventShowStyle.buttonContainer}>
              <RaisedButton label="Start Waiting" primary={true} onTouchTap={this._queueStart.bind(this, wait._id, userId)} />
            </CardActions>
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in line !"
          >
            <CardText style={EventShowStyle.textContainer}>When you're done with you're wait, press this button to let your client know you've done your job</CardText>
            <CardActions style={EventShowStyle.buttonContainer}>
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
            <CardActions style={EventShowStyle.buttonContainer}>
              <RaisedButton label="Confirm" primary={true} onTouchTap={this._validateCode.bind(this, this.state.code, wait._id, userId)} />
            </CardActions>
          </Card>)
      default:
        this._onRefresh();
        return (
          <CardText>Waiter</CardText>
        )
    }
  }

  render() {
    let event = this.state.event;
    let wait = this.state.wait;
    let isWaiter = this.state.isWaiter;

    /* if (this.state.fixDegeu > 0) {
      this.dispatch([
        EventsActions.getOneEvent(this.eventId),
        WaitActions.getCurrentWait(this.props.user._id, this.props.isWaiter ? 'waiter' : 'client')
      ]);
      this.setState({
        fixDegeu: this.state.fixDegeu - 1
      })
    } */
    return (
      <Card style={{ margin: "100px", padding: "20px" }}>
        <CardTitle
          title={event.name}
          subtitle={"Detail de l'evenement " + event.name}
          style={EventShowStyle.headers}
        />
        <CardActions style={EventShowStyle.buttonContainer}>
          <RaisedButton label="Refresh" primary={true} onTouchTap={this._onRefresh.bind(this)} />
        </CardActions>
        <CardText style={EventShowStyle.buttonContainer}
        >
          {event.description}
        </CardText>
        <CardText style={EventShowStyle.buttonContainer}>
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
