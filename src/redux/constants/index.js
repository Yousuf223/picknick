export const USERLOGINTOKEN = 'USERLOGINTOKEN';
export const USERLOGINDATA = 'USERLOGINDATA';
export const SET_ROLE = 'SET_ROLE';
export const USERLOGOUT = 'USERLOGOUT';
export const CURRENTLOGINUSERINFO = 'CURRENTLOGINUSERINFO';
export const ISUSERLOGIN = 'ISUSERLOGIN';
export const LOADER = 'LOADER';
export const CURRENTUSERPROFILE = 'CURRENTUSERPROFILE';
export const ERRMSG = 'ERRMSG';
export const SEARCHEDREST = 'SEARCHEDREST';
export const VERIFY_POPUP = 'VERIFY_POPUP';
export const SAVEEMAILFORUSER = 'SAVEEMAILFORUSER';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {
    REQUEST: undefined,
    SUCCESS: undefined,
    CANCEL: undefined,
    FAILURE: undefined,
  };
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const SHOW_LOADING = 'SHOW_LOADING';
export const LOADING_STATE = 'APP_INFO_SHOW_LOADING';
export const PRIVACY_POLICY = 'PRIVACY_POLICY';
export const CLEAR_USER_TEMP_DATA = 'CLEAR_USER_TEMP_DATA';
export const APP_USAGE_POLICIES = createRequestTypes('APP_USAGE_POLICIES');

// USER ACTIONS
export const SOCIAL_SIGNUP_USER = createRequestTypes('SOCIAL_SIGNUP_USER');
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
export const COMPLETE_PROFILE = createRequestTypes('COMPLETE_PROFILE');
export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const SIGNUP_USER = createRequestTypes('SIGNUP_USER');
export const DELETE_USER = createRequestTypes('DELETE_USER');
export const VERIFY_OTP = createRequestTypes('VERIFY_OTP');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const ADD_PROFILE_PICTURE = createRequestTypes('ADD_PROFILE_PICTURE');
export const RESEND_PASSWORD = createRequestTypes('RESEND_PASSWORD');
// App Action

export const GET_ALL_STATES = createRequestTypes('GET_ALL_STATES');

export const ADD_PROPERTIES = createRequestTypes('ADD_PROPERTIES');
export const GET_ALL_LEVELS = createRequestTypes('GET_ALL_LEVELS');
export const GET_ALL_LEVELS_BY_ID = createRequestTypes('GET_ALL_LEVELS_BY_ID');
export const GET_ALL_USERS = createRequestTypes('GET_ALL_USERS');
export const ADD_EVENT = createRequestTypes('ADD_EVENT');
export const GET_EVENT = createRequestTypes('GET_EVENT');
export const FOLLOW_USER = createRequestTypes('FOLLOW_USER');
export const GET_ALL_STORE = createRequestTypes('GET_ALL_STORE');
export const CREATE_TRIP = createRequestTypes('CREATE_TRIP');
export const GET_FOLLOWERS_REQUEST = createRequestTypes('GET_FOLLOWERS_REQUEST');
export const ACCEPT_REQUEST = createRequestTypes('ACCEPT_REQUEST');
export const NOTIFICATION_TOGGLE = createRequestTypes('NOTIFICATION_TOGGLE');
export const REMOVE_REQUEST = createRequestTypes('REMOVE_REQUEST');
export const GET_HOME_STORE = createRequestTypes('GET_HOME_STORE');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const CREATE_POST = createRequestTypes('CREATE_POST');
export const GET_LIST = createRequestTypes('GET_LIST');
export const GET_PROFILE = createRequestTypes('GET_PROFILE');
export const NEAR_BY_USER_LIST = createRequestTypes('NEAR_BY_USER_LIST');
export const SEND_REQUEST = createRequestTypes('SEND_REQUEST');
export const SENT_REQUEST_LIST = createRequestTypes('SENT_REQUEST_LIST');
export const RECEIVED_REQUEST = createRequestTypes('RECEIVED_REQUEST');
export const ACCEPT_REJECT_REQUEST = createRequestTypes('ACCEPT_REJECT_REQUEST');
export const FRIEND_LIST = createRequestTypes('FRIEND_LIST');
export const MY_POST = createRequestTypes('MY_POST');
export const API_LIKE = createRequestTypes('API_LIKE');
export const LIKES_LIST = createRequestTypes('LIKES_LIST');
export const DELETE_COMMENT = createRequestTypes('DELETE_COMMENT');
export const REPORT_POST = createRequestTypes('REPORT_POST');
export const SEARCH_USERS = createRequestTypes('SEARCH_USERS');
export const DELETE_POST = createRequestTypes('DELETE_POST');
export const PROFILE_DETAILS = createRequestTypes('PROFILE_DETAILS');
export const UNFRIEND = createRequestTypes('UNFRIEND');
export const EDIT_COMMENT = createRequestTypes('EDIT_COMMENT');
export const CHAT_LIST = createRequestTypes('CHAT_LIST');
export const GET_PRIVACY = createRequestTypes('GET_PRIVACY');
export const GET_ABOUT = createRequestTypes('GET_ABOUT');
export const GET_TERMSCONDITION = createRequestTypes('GET_TERMSCONDITION');
export const GET_NOTIFICATION_ONOFF = createRequestTypes('GET_NOTIFICATION_ONOFF');
export const GET_NOTIFICATION = createRequestTypes('GET_NOTIFICATION');
export const UPLOAD_IMAGE = createRequestTypes('UPLOAD_IMAGE')
export const CREATE_HEEDBACK = createRequestTypes('CREATE_HEEDBACK')
export default {
  LOADING_STATE,
  SOCIAL_SIGNUP_USER,
  LOGIN_USER,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  GET_ALL_STATES,
  ADD_PROPERTIES,
  GET_ALL_LEVELS_BY_ID,
  SIGNUP_USER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESEND_PASSWORD,
  ADD_EVENT,
  GET_NOTIFICATION,
  GET_EVENT,
  GET_ALL_USERS, FOLLOW_USER,
  GET_ALL_LEVELS, GET_ALL_STORE, CREATE_TRIP, GET_FOLLOWERS_REQUEST,
  ACCEPT_REQUEST, NOTIFICATION_TOGGLE,
  REMOVE_REQUEST, GET_HOME_STORE,
  SOCIAL_LOGIN,
  CREATE_POST,
  GET_LIST,
  GET_PROFILE,
  NEAR_BY_USER_LIST,
  SEND_REQUEST,
  SENT_REQUEST_LIST,
  RECEIVED_REQUEST,
  ACCEPT_REJECT_REQUEST,
  FRIEND_LIST,
  MY_POST,
  API_LIKE,
  LIKES_LIST,
  DELETE_COMMENT,
  REPORT_POST,
  SEARCH_USERS,
  DELETE_POST,
  PROFILE_DETAILS,
  UNFRIEND,
  EDIT_COMMENT,
  CHAT_LIST,
  ADD_PROFILE_PICTURE,
  GET_TERMSCONDITION,
  GET_ABOUT,
  GET_PRIVACY,
  GET_NOTIFICATION_ONOFF,
  UPLOAD_IMAGE,
  CREATE_HEEDBACK  
};
