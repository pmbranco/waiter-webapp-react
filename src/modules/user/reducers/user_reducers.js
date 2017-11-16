import Immutable from 'immutable';
import LocalStorage from 'localStorage';

const defaultState = new Immutable.fromJS({
  user: {},
  pastWaits: [],
  isWaiter: false,
  savedCards: []
});

function user_reducer(state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'PASSWORD_UPDATE_SUCCESS':
      return state;

    case 'PASSWORD_UPDATE_FAILURE':
      return state;

    case 'PROFILE_UPDATE_SUCCESS':
      let oldUser = state.get('user');
      oldUser.firstName = action.info.firstName;
      oldUser.lastName = action.info.lastName;
      oldUser.email = action.info.email;

      return state.set("user", oldUser);

    case 'PROFILE_UPDATE_FAILURE':
      return state;

    case 'GET_USER_SUCCESS':
      nextState = state.set('user', action.data.data.user);
      return nextState;

    case 'GET_USER_FAILURE':
      return state;

    case 'TOGGLE_USER':
      return state.set('isWaiter', action.data.userType);

    case 'GET_PAST_WAITS_SUCCESS':
      nextState = state.set('pastWaits', action.data.data.wait)
      return nextState;

    case 'GET_PAST_WAITS_FAILURE':
      return state;

    case 'GET_CARDS_SUCCESS':
      //console.log(action.data.data);
      nextState = state.set('savedCards', action.data.data.cards)
      return nextState;
    case 'GET_CARDS_FAILURE':
      return state;

    case 'SAVE_CARD_SUCCESS':
      const tmp = [action.info.cardToken];
      nextState = state.set('savedCards', tmp.concat(state.toJS().savedCards));
      return nextState;
    case 'SAVE_CARD_FAILURE':
      return state;

    default:
      return state;
  }
}

export default user_reducer;
