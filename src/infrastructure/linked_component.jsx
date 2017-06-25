import _ from "lodash";
import LoadingComponent from "./loading_component";

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

class LinkedComponent extends LoadingComponent {
  constructor (props) {
    super(props);
  }

  /**
   * Pemet d'effectuer un bind sur les valeurs d'un composant
   *
   * @param {string} propertyPath - chemin de la propriété
   * @param {string?} defaultValue - valeur par défaut
   * @param {function?} callback - executer après la mise à jour du state
   */
  linkState (propertyPath, defaultValue, callback) {
    if (typeof defaultValue === "function") {
      callback = defaultValue;
      defaultValue = null;
    }

    let self = this;
    return function (event) {
      let newValue = event;
      //si c'est un event REACT ou HTML alors on récupère la value de l'input sinon on renvoie la valeur
      if(event.target){
        newValue = LinkedComponent._getInputValue(event.target, defaultValue);
      }

      self.setState((previousState)=> {
        let newState = _.clone(previousState || {});
        _.set(newState, propertyPath, newValue);
        return newState;
      }, self.onStateChanged.bind(self)(callback));
    };
  }

  /**
   * execute le callback si il existe et le bind à la classe
   * @param {function} callback - le callbac à executer
   * @returns {function(this:LinkedComponent)}
   */
  onStateChanged(callback){
    return function(){
      if(callback !== undefined){
        callback.bind(this)();
      }
    }.bind(this);
  }

  /**
   * renoie la valeur d'un input en fonction de son type
   * @param {domElement} input - l'input dont on veut la valeur
   * @param {*} defaultValue - la valeur à renvoyer si l'input est vide
   * @returns {string|{value, checked}} - renvoie la valeur de l'input ou pour les checkbox/radio
   * un objet avec la valeur et son état checked ou pas
   * @private
   */
  static _getInputValue (input, defaultValue) {
    if (!input) {
      return defaultValue;
    }

    if(input.value === "false"){
      return false;
    }

    if(input.value === "true"){
      return true;
    }

    return input.value;
  }
}

export default LinkedComponent;