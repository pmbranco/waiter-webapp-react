import Immutable from 'immutable';
import LocalStorage from 'localStorage';

const defaultState = new Immutable.fromJS({
  user: {},
  isWaiter: 0
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

      console.log(oldUser);
      return state.set("user", oldUser);

    case 'PROFILE_UPDATE_FAILURE':
      return state;

    case 'GET_USER_SUCCESS':
      console.log(action.data.data.user)
      nextState = state.set('user', action.data.data.user);
      return nextState;

    case 'GET_USER_FAILURE':
      return state;

    case 'TOGGLE_USER':
      console.log("coucou")
      console.log(action.data)
      return state.set('isWaiter', action.data.userType);

    default:
      return state;
  }
}

export default user_reducer;
