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

function updateUser(updatedProfile) {

  return {
    type: 'PROFILE_UPDATE',
    info: {
      "firstName": updatedProfile.firstName,
      "lastName": updatedProfile.lastName,
      "email": updatedProfile.email
    },
    promise: ApiCallLib.put(`/user/${updatedProfile.userId}/profile`, {
      "firstName": updatedProfile.firstName,
      "lastName": updatedProfile.lastName,
      "email": updatedProfile.email
    })
  }
} // <= create

function getUser(userId) {
    return {
        type: "GET_USER",
        promise: ApiCallLib.get(`/user/${userId}`, {})
    }
}

function toggleUserType(userType) {
  return {
    type: "TOGGLE_USER",
    data: {userType: userType}
  }
}

function getPastWaits(userId) {
  return {
      type: "GET_PAST_WAITS",
      promise: ApiCallLib.get(`/wait/user/${userId}/history`, 'client')
  }
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


export default {
  updatePassword,
  getUser,
  updateUser,
  toggleUserType,
  getPastWaits
};
