import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../../../actions';
import LinkedComponent from '../../../infrastructure/linked_component';

/* import {
  Text,
  Card
} from 'react-native-elements'; */
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const style = require('./style.js').default;

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class PastWaits extends LinkedComponent {

    constructor(props) {
        super(props);
        this.state = {
            pastWaits: []
        };
    }

    // ----------------------------------------------------------------------

    componentWillMount() {
        this.dispatchWithLoader(UserActions.getPastWaits(this.props.user.toJS().user._id));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pastWaits: nextProps.user.toJS().pastWaits
        });
    }

    componentDidMount() {
    }

    // ----------------------------------------------------------------------

    _renderWaits(waits) {
        return waits.map(wait => (
            <Card
                key={`wait_${wait._id}`}
            >
                <CardTitle
                    title={wait.eventName}
                >
                    <CardText>
                        {wait.queueEnd}
                    </CardText>
                    <CardText >
                        {wait.state}
                    </CardText>
                </CardTitle>
            </Card>
        ))
    }

    render() {
        const waits = this.state.pastWaits;

        return (
            <Card>
                <CardTitle
                    title="Past Waits"
                    subtitle="List les waits passés"
                    style={style.headers}
                />
                <CardMedia >
                    {this._renderWaits(waits)}
                </CardMedia>
            </Card>
        );
    } // <= render

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------


}

function mapStateToProps(state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(PastWaits);
