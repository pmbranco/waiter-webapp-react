import React from "react";
import _ from "lodash";
import constants from "./constants";

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

class BaseComponent extends React.Component {
  constructor (props) {
    super(props);
    this.ASSETS_URL = constants.ASSETS_URL;
  }


  /**
   * Check if the translation key exists and return an empty string or a default value you have to pass
   * @param {string} key - la clé de traduction
   * @param {string} [defaultValue] - la clé de traduction par defaut
   * @returns {string} - le texte à afficher
   */
  getTranslation (key, defaultValue = "") {
    return _(this).invoke("props.translations.get", key, "" || defaultValue);
  }
}

export default BaseComponent;