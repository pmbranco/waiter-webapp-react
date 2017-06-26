import Immutable from 'immutable';
import {enums} from '../helpers';

const defaultState = new Immutable.fromJS({
  isPageLoading: false,
  message: "Chargement en cours..."
});

function loaderReducer (state = defaultState, action) {
  switch (action.type) {
    case enums.get:
      return _showLoader(state, action);
    default:
      return state;
  }
}

/**
 * affiche le loader du state
 * et modifie le message si nécéssaire
 * @param {Map} state - le state courant
 * @param {object} action - les information de l'action
 * @returns {object} - renvoie le state mis à jour
 * @private
 */
function _showLoader (state, action) {
  if (state) {
    let newState = state.toJS();
    newState.isPageLoading = action.isPageLoading === undefined ? newState.isPageLoading : action.isPageLoading;
    newState.message = action.message || newState.message;
    return new Immutable.fromJS(newState);
  }

  return state;
}

export default loaderReducer;
