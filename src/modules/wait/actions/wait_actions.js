import { ApiCallLib } from '../../../libs/index';

function getCurrentWait(userId, userType) {

  return {
    type: 'GET_CURRENT_WAIT',
    promise: ApiCallLib.get(`/wait/user/${userId}`, userType)
  }
} // <= create

function requestWait(userId, eventId, numberWaiter) {

  return {
    type: 'REQUEST_WAIT',
    promise: ApiCallLib.post(`/wait`, {
      eventId: eventId,
      userId: userId,
      numberOfWaiters: numberWaiter
    })
  }
}

function generateCode(waitId, clientId) {
  return {
    type: 'GENERATE_CODE',
    promise: ApiCallLib.put(`/wait/${waitId}/generate-code/${clientId}`, {})
  }
}

function changeWaitState(waitId, waiterId, state) {
  return {
    type: 'CHANGE_WAIT_STATE',
    promise: ApiCallLib.put(`/wait/${waitId}/${state}/${waiterId}`, {})
  }
}

function validateCode(code, waitId, waiterId) {
  return {
    type: 'VALIDATE_CODE',
    promise: ApiCallLib.put(`/wait/${waitId}/validate`, {
      waiterId: waiterId,
      code: code
    })
  }
}

export default {
  getCurrentWait,
  requestWait,
  generateCode,
  changeWaitState,
  validateCode
};