/* import React from 'react';
import Payment from 'payment';
import { connect } from 'react-redux'
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { getStripeToken } from '../../../helpers/get_stripe_token.js';
import { Elements, CardElement } from 'react-stripe-elements';
import { UserActions } from '../../../actions';
import LinkedComponent from '../../../infrastructure/linked_component';
import Cards from 'react-credit-cards';

import CardReactFormContainer from 'card-react';


//import { Bert } from 'meteor/themeteorchef:bert';
//import { getStripeToken } from '../../modules/get-stripe-token.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const style = require("./style.js").default;

import '../../../../node_modules/card-react/lib/card'

class CreditCard extends LinkedComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardsList: [],
      form: {}
    };
  }

  componentWillMount() {
    this.dispatch(UserActions.getCards(this.props.user_data.user._id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardsList: nextProps.user_data.savedCards
    });
  }

  _handleChange(change) {
    this.setState({ form: change });
  }

  _handleSubmit(event) {
  }

  render() {
    return (<div>
      <div id="card-wrapper"></div>
      <CardReactFormContainer
        container="card-wrapper"

        formInputsNames={
          {
            number: 'CCnumber', // optional — default "number"
            expiry: 'CCexpiry',// optional — default "expiry"
            cvc: 'CCcvc', // optional — default "cvc"
            name: 'CCname' // optional - default "name"
          }
        }

        initialValues={
          {
            //number: '4242424242424242', // optional — default •••• •••• •••• ••••
            //cvc: '123', // optional — default •••
            //expiry: '16/12', // optional — default ••/••
            //name: 'Random Name' // optional — default FULL NAME
          }
        }

        classes={
          {
            valid: 'valid-input', // optional — default 'jp-card-valid'
            invalid: 'invalid-input' // optional — default 'jp-card-invalid'
          }
        }

        formatting={true} // optional - default true
      >
      <TextField
                        hintText="Email Address"
                        floatingLabelText="Email Address"
                        onChange={this.linkState("email")}
                    />
        <form>
          <input placeholder="Full name" type="text" name="CCname" />
          <input placeholder="Card number" type="text" name="CCnumber" />
          <input placeholder="MM/YY" type="text" name="CCexpiry" />
          <input placeholder="CVC" type="text" name="CCcvc" />
        </form>

      </CardReactFormContainer>
    </div>
    );
  }
}

export default connect((state) => {
  return {
    user_data: state.user.toJS()
  };
})(CreditCard); */

import React from 'react';
import Payment from 'payment';
import { connect } from 'react-redux'
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { getStripeToken } from '../../../helpers/get_stripe_token.js';
import { Elements, CardElement } from 'react-stripe-elements';
import { UserActions } from '../../../actions';
import LinkedComponent from '../../../infrastructure/linked_component';
import Cards from 'react-credit-cards';


//import { Bert } from 'meteor/themeteorchef:bert';
//import { getStripeToken } from '../../modules/get-stripe-token.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const style = require("./style.js").default;

class CreditCard extends LinkedComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardsList: [],
      form: {},
      open: false
    };
  }

  componentWillMount() {
    this.dispatch(UserActions.getCards(this.props.user_data.user._id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardsList: nextProps.user_data.savedCards
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _handleChange(change) {
    this.setState({ form: change });
  }

  _handleSubmit(event) {
  }

  _renderCards(cardsList) {

    if (cardsList.length <= 0) {
      return (
        <Card style={{ margin: "30px" }}>
          <CardText>
            No card registered yet
          </CardText>
        </Card>
      )
    }
    return cardsList.map((card, i) => {
      return (
        <Card key={"cardKey" + i} style={{ margin: "10px" }}>
          <CardText>
            {"card ending in " + this.state.cardsList[i]}
          </CardText>
          <CardActions >
            <RaisedButton color='red' label="Remove" primary={true} />
          </CardActions>
        </Card>
      )
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok..."
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
       <div>
          <Dialog
          title="Sorry but i ran out of time :'("
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This is not yet implemented, i ran out of time and i am sorry for that.
        </Dialog>
        <Card>
          <CardTitle
            title="Manage Payment"
            subtitle="here you can manage your payments methodes"
            style={style.headers}
          />
          {this._renderCards(this.state.cardsList)}
          <Card style={{ margin: '40px', textAlign: 'center' }}>
            <CardTitle
              subtitle="Or you can register a new card for payment"
              style={{ textAlign: 'center' }}
            />
            <Card style={{ marginRight: '400px', marginLeft: '400px', marginBottom: '40px' }}>
              <Elements>
                <CardElement
                  style={{ base: { fontSize: '18px' } }}
                  onChange={this._handleChange.bind(this)} />
              </Elements>
              <CardActions >
                <RaisedButton label="View" primary={true} onTouchTap={this.handleOpen.bind(this)} />
              </CardActions>
            </Card>
          </Card>
        </Card>
        </div>
    );
  }
}

export default connect((state) => {
  return {
    user_data: state.user.toJS()
  };
})(CreditCard);