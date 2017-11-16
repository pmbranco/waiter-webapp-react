import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { StripeProvider } from 'react-stripe-elements';

import { configure as configureStore } from './store';
import { default as routes } from './routes';

const initialState = window.__INITIAL_STATE__;
Object.keys(initialState).forEach(k => initialState[k] = Immutable.fromJS(initialState[k]));
const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (process.env.BROWSER) {
    window.jQuery = window.$ = require('jquery/dist/jquery');
}

ReactDOM.render(
    <Provider store={store}>
        <StripeProvider apiKey="pk_test_hSipBuKxXUGrnuu2XpqrNpm4">
            <Router routes={routes(store)} history={history} />
        </StripeProvider>
    </Provider>,
    document.getElementById('app')
);



/*import ReactDOM from 'react-dom'
import App from './app.jsx'

import React, { Component } from 'react'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';

import Signin from './ui/pages/signin/index.jsx';
import Security from './ui/pages/security/index.jsx';
import Map from './ui/pages/map/index.jsx';
import Events from './ui/pages/event/index.jsx';
import Account from './ui/pages/account/index.jsx';
import Signup from './ui/pages/signup/index.jsx';



class Main extends Component {
    render() {
        return (
                <Router history={hashHistory}>
                    <div>
                        <Route path='/' component={App} history={hashHistory}>
                            <IndexRoute component={Signin} history={hashHistory}/>
                            <Route path='/signup' component={Signup}/>
                            <Route path='/security' component={Security}/>
                            <Route path='/map' component={Map}/>
                            <Route path='/events' component={Events}/>
                            <Route path='/account' component={Account}/>
                        </Route>
                    </div>
                </Router>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))*/