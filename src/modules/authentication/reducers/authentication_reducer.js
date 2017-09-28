import Immutable from 'immutable';
import LocalStorage from 'localStorage';

const defaultState = new Immutable.fromJS({
  token: LocalStorage.getItem('token'),
  userId: LocalStorage.getItem('userId'),
  error: false
});

function authentication_reducer (state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'SIGNUP_CREATE_SUCCESS':
      return _set_token(state, action.data.data.token, action.data.data.user._id);

    case 'SIGNUP_CREATE_FAILURE':
      return _failure_token(defaultState);

    case 'AUTHENTICATION_CREATE_SUCCESS':
      return _set_token(state, action.data.data.token, action.data.data.user._id);

    case 'AUTHENTICATION_INIT': // soucie avec l'id qu'on à pas si on fait ca
      let curToken = LocalStorage.getItem('token');
      let curId = LocalStorage.getItem('userId');

      if (curToken && curToken.length) {
        return _set_token(defaultState, curToken, curId);
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
  let nextState;

  LocalStorage.removeItem('token');
  LocalStorage.removeItem('userId');
  nextState = state.set("userId", null);
  return nextState.set('token', null);
} // <= _destroy_token

function _set_token (state, token, userId) {
  let nextState;

  LocalStorage.setItem('token', token);
  LocalStorage.setItem('userId', userId);
  nextState = state.set("userId", userId);  
  return nextState.set('token', token);
} // <= _destroy_token

function _failure_token (state) {
  return state.set('error',true);
} // <= _failure_token

function _reset_token (state) {
  return state.set('error',false);
} // <= _reset_token

export default authentication_reducer;
