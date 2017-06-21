import React, { Component } from 'react';
import Input from 'muicss/lib/react/input';

const style = require('./style.js').default;

console.log(style);

class Events extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container" style={style.headers}>
                <div className="forms" style={style.headers}>
                    <div className="header" style={style.headers}>
                        <div >
                            Welcome to Waiter
                        </div>
                        <div >
                            Events Page
                     </div>
                    </div >
                </div>
            </div>
        );
    }
}

export default Events;