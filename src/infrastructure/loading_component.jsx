import RoutingComponent from "./routing_component";
import { LoaderActions, MessengerActions } from "../actions";

class LoadingComponent extends RoutingComponent {

  constructor (props) {
    super(props);
  }

  /**
   * Dispatch une ou plusieurs actions. Pendant l'éxécution
   * affiche un loader et masque le masque à la fin ou en cas d'erreur
   * Affiche un message si défini en cas d'erreur ou de succes
   * @param {object|object[]} action - l'action ou les actions à "dispatcher"
   * @param {string?} errorMessage - à la fin de/des action(s) un message d'erreur est affiché à l'utilisateur
   * @param {string?} successMessage - à la fin de/des action(s) un message  de succès est affiché à l'utilisateur
   */
  dispatchWithLoader (action, errorMessage, successMessage) {
    if(!this.props && !this.props.dispatch){
      throw new Error("LoadingComponent sub class is not connected can'use dispatch method");
    }

    return this._dispatch(true, action, errorMessage, successMessage);
  }

  /**
   * Dispatch une ou plusieurs actions. Pendant l'éxécution
   * affiche un message à la fin ou en cas d'erreur
   * @param {object|object[]} action - l'action ou les actions à "dispatcher"
   * @param {string?} errorMessage - à la fin de/des action(s) un message d'erreur est affiché à l'utilisateur
   * @param {string?} successMessage - à la fin de/des action(s) un message  de succès est affiché à l'utilisateur
   */
  dispatch (action, errorMessage, successMessage) {
    if(!this.props && !this.props.dispatch){
      throw new Error("LoadingComponent sub class is not connected can'use dispatch method");
    }

    return this._dispatch(false, action, errorMessage, successMessage);
  }

  _dispatch (loaderEnabled, action, errorMessage, successMessage) {
    if (!action) {
      throw new Error("can't dispatch undefined action!");
    }

    if (loaderEnabled) {
      this.props.dispatch(LoaderActions.loader(true));
    }

    const promises = this._getPromise(action)
    .then(() => {
      this.props.dispatch(LoaderActions.loader(false));
      if (successMessage) {
        this.props.dispatch(MessengerActions.addSuccess(successMessage));
      }
    })
    .catch((error) => {
      if (loaderEnabled) {
        this.props.dispatch(LoaderActions.loader(false));
      }

      if (errorMessage) {
        this.props.dispatch(MessengerActions.addError(errorMessage));
      }

      throw error;
    });

    this._dispatchAction(action);
    return promises;
  }

  /**
   * renvoie une promise résolue à la fin de l'exécution de|des action(s)
   * @param {object|object[]} action - l'action ou les actions dont on veut les promises
   * @returns {Promise}
   * @private
   */
  _getPromise (action) {
    if (Array.isArray(action)) {
      let promises = [];
      action.forEach((currentAction)=> {
        if (currentAction.promise) {
          promises.push(currentAction.promise);
        }
      });

      return Promise.all(promises);
    }

    return action.promise || Promise.resolve();
  }

  /**
   * Dispatch une|des action(s)
   * @param {object|object[]} action - l'action ou les actions à dispatcher
   * @private
   */
  _dispatchAction (action) {
    if (Array.isArray(action)) {
      action.forEach((currentAction)=> {
        this.props.dispatch(currentAction);
      });
      return;
    }

    this.props.dispatch(action);
  }
}

export default LoadingComponent;