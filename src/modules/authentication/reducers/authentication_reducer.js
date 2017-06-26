import Immutable from 'immutable';
import LocalStorage from 'localStorage';

const defaultState = new Immutable.fromJS({
  token: LocalStorage.getItem('token'),
  userId: ""
});

function authentication_reducer (state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'SIGNUP_CREATE_SUCCESS':
      nextState = state.set("userId", action.data.data.user._id);
      return _set_token(state, action.data.data.token);

    case 'SIGNUP_CREATE_FAILURE':
      return _failure_token(defaultState);

    case 'AUTHENTICATION_CREATE_SUCCESS':
      nextState = state.set("userId", action.data.data.user._id);
      return _set_token(nextState, action.data.data.token);

    case 'AUTHENTICATION_INIT': // soucie avec l'id qu'on à pas si on fait ca
      var curToken = LocalStorage.getItem('token');

      if (curToken && curToken.length) {
        return _set_token(defaultState, curToken);
      }

      return state;

    case 'AUTHENTICATION_DESTROY':
      return _destroy_token(defaultState);

    case 'AUTHENTICATION_CREATE_FAILURE':
      return _failure_token(defaultState);

    case 'AUTHENTICATION_FAILURE_RESET':
      return _reset_token(defaultState);

    default:
      return state;
  }
}

function _destroy_token (state) {
  LocalStorage.removeItem('token');
  return state.set('token', null);
} // <= _destroy_token

function _set_token (state, token) {
  LocalStorage.setItem('token', token);
  return state.set('token', token);
} // <= _destroy_token

function _failure_token (state) {
  return state.set('error',true);
} // <= _failure_token

function _reset_token (state) {
  return state.set('error',false);
} // <= _reset_token

export default authentication_reducer;
