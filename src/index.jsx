import ReactDOM from 'react-dom'
import App from './app.jsx'

import React, { Component } from 'react'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

ReactDOM.render(<Main />, document.getElementById('root'))