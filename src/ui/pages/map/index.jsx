import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from 'react-redux'

const style = require('./style.js').default;

import LinkedComponent from '../../../infrastructure/linked_component';
import { EventsActions } from '../../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import { geolocated } from 'react-geolocated';


// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.coordinate.latitude, lng: props.coordinate.longitude }}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={{
          lat: marker.event.location[1],
          lng: marker.event.location[0]
        }}
        onClick={() => props.onMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <RaisedButton label={marker.event.name} style={style} onTouchTap={() => props.goToEvent(marker)} />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

class Map extends LinkedComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      width: '0',
      height: '0',
      coordinate: null
    };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.goToEvent = this.goToEvent.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  _onSuccessLocation(data) {
    this.setState({
      coordinate: data.coords
    });
  }

  _onErrorLocation(data) {
    this.setState({
      coordinate: {
        latitude: 43.5971644,
        longitude: 1.4280699
      }
    });
  }

  componentWillMount() {
    this.props.dispatch(EventsActions.getAllEvents());
    if (navigator.geolocation !== undefined) {
      navigator.geolocation.getCurrentPosition(this._onSuccessLocation.bind(this), this._onErrorLocation.bind(this));
    } else {
      this.setState({
        coordinate: {
          latitude: 43.5971644,
          longitude: 1.4280699
        }
      });
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.events.map((event) => {
        return {
          event: event,
          showInfo: false
        }
      })
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      events: this.state.events.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.events.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  goToEvent(event) {
    this.redirect(`/events/${event.event._id}`);
  }

  render() {
    if (!this.state.coordinate) {
      return null
    }
    return (
      <div style={{ height: this.state.height - 64 }}>
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          coordinate={this.state.coordinate}
          markers={this.state.events}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          goToEvent={this.goToEvent}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    events: state.events.get("events")
  };
})(Map);
