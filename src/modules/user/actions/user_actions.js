import { ApiCallLib } from '../../../libs'

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------

function updatePassword(updatedPassword) {

  return {
    type: 'PASSWORD_UPDATE',
    promise: ApiCallLib.put(`/user/${updatedPassword.userId}/password`, {
      "password": updatedPassword.password,
      "newPassword": updatedPassword.newPassword
    })
  }
} // <= create

function getUser(userId) {
    return {
        type: "GET_USER",
        promise: ApiCallLib.get(`/user/${userId}`, {coucou: "couycou"})
    }
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


export default {
  updatePassword,
  getUser
};
