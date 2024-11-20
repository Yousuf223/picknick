import ActionTypes, {
  USERLOGINDATA,
  USERLOGOUT,
  USERLOGINTOKEN,
  CURRENTLOGINUSERINFO,
  SAVEEMAILFORUSER,
  VERIFY_POPUP,SET_ROLE
} from '../../constants';
import store from '../../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loginUser(payload) {
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function setRole(payload) {
  return {
    type: SET_ROLE,
    payload,
  };
}
export function saveTokenForLoginUser(payload) {
  return {
    type: USERLOGINTOKEN,
    payload,
  };
}
export function saveEmailForUser(payload) {
  return {
    type: SAVEEMAILFORUSER,
    payload,
  };
}
export function toggleVerificationPopUp(payload) {
  return {
    type: VERIFY_POPUP,
    payload,
  };
}
export function signUpUser(payload,role) {
  return {
    type: ActionTypes.SIGNUP_USER.REQUEST ,
    payload,
    role
  };
}
export function resendOTP(payload,responseCallback) {
  return {
    type: ActionTypes.RESEND_OTP.REQUEST,
    payload,
    responseCallback
  };
}
export function otpVerify(payload, role,user_id,screenName) {
  return {
    type: ActionTypes.VERIFY_OTP.REQUEST,
    payload,
    role,
    user_id,
    screenName
  };
}
export function forgotPassword(payload) {
  return {
    type: ActionTypes.FORGOT_PASSWORD.REQUEST,
    payload,
  };
}
export function resendPassword(payload) {
  return {
    type: ActionTypes.RESEND_PASSWORD.REQUEST,
    payload,
  };
}
export function saveUserForLoginUser(payload) {
  return {
    type: CURRENTLOGINUSERINFO,
    payload,
  };
}
export function loginCurrentUser(payload) {
  return {
    type: ActionTypes.LOGIN_USER.REQUEST,
    payload,
  };
}
export function socialSignin(payload) {
  return {
    type: ActionTypes.SOCIAL_LOGIN.REQUEST,
    payload,
  };
}
export function completeProfile(payload) {
  return {
    type: ActionTypes.COMPLETE_PROFILE.REQUEST,
    payload,
  };
}
export function updateProfile(payload,responseCallback) {
  return {
    type: ActionTypes.UPDATE_PROFILE.REQUEST,
    payload,
    responseCallback
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}
export function logoutUserWithDispatch() {
  dispatch({type: USERLOGOUT});
}

export function logoutCurrentUser(payload) {
  return {
    type: ActionTypes.USER_LOGOUT.REQUEST,
    payload
  };
}

export function changePassword(payload) {
  return {
    type: ActionTypes.CHANGE_PASSWORD.REQUEST,
    payload,
  };
}
export function deleteProfile(payload, responseCallback,) {
  return {
    type: ActionTypes.DELETE_USER.REQUEST,
    payload,
    responseCallback,
  };
}
export function addProfilePicture(payload, responseCallback,) {
  return {
    type: ActionTypes.ADD_PROFILE_PICTURE.REQUEST,
    payload,
    responseCallback,
  };
}
export function saveGlobalSocket(socket) {
  dispatch({type: 'SAVE_SOCKET', payload: socket});
}
