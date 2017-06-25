import React, { Component } from 'react';

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
                            Map à afficher plus tard
                        </div>
                        <div >
                            Skip the line
                     </div>
                    </div >
                </div>
            </div>
        );
    }
}

export default Map;