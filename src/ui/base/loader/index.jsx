import classNames from 'classnames';
import React from 'react';
import $ from 'jquery';

if (process.env.BROWSER) {
  require('./loader.css');
}

export default class Loader extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!process.env.BROWSER) {
      return;
    }

    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        $("body").css({ "overflow": "hidden" });
      } else {
        $("body").removeAttr('style');
      }
    }
  }

  render() {
    return (
      <div className={classNames("loader", { 'hide': !this.props.show })}>
        <div className="loader-content" ></div>
      </div>
    );
  }
}

Loader.propTypes = {
  /**
   * the message to add on the loader
   */
  message: React.PropTypes.string,
  /**
   * Is loader visible or not
   */
  show: React.PropTypes.bool

};


Loader.defaultProps = {
  message: "Chargement en cours...",
  show: false
};
