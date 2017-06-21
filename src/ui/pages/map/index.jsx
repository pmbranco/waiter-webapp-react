import React, { Component } from 'react';
import Input from 'muicss/lib/react/input';

const style = require('./style.js').default;

class Map extends Component {
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
                            Skip the line
                     </div>
                    </div >
                    <form>
                        <Input label="Email address" floatingLabel={true} />
                        <Input label="Password" floatingLabel={true} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Map;