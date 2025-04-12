import _ from 'lodash';
import ApiSauce from '../services/ApiSauce';
import store from '../redux';

// export const BASE_URL = 'https://sn6jm18m-8000.inc1.devtunnels.ms/api/v1/';
export const BASE_URL = 'https://ldq8gkns-5000.inc1.devtunnels.ms/api/v1/';
export const ASSETS_URL = 'https://3239dgd1-8000.inc1.devtunnels.ms/';
export const WEB_SOCKET_URL = 'https://host2.appsstaging.com:3018/';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=';
// export const BASE_URL = "http://10.0.4.71:3018/api/v1/"; //local
// export const ASSETS_URL = "http://10.0.4.71:3018/"; //local
export const API_TIMEOUT = 20000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';
export const GEOCODE_API_KEY = 'AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};
export const ERROR_CANCEL_ERROR = {
  message: 'Upload cancelled',
  error: 'Upload cancelled',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

// API USER ROUTES

export const SIGNUP = {
  route: 'auth/signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_OTP = {
  route: 'auth/verify-signup-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const LOGIN = {
  route: 'auth/login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_PASSWORD = {
  route: 'users/auth/reset-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const RESEND_OTP = {
  route: 'auth/resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const FORGOT_PASSWORD = {
  route: 'users/auth/forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_SIGIN = {
  route: 'social_login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const LOGOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMPLETE_PROFILE = {
  route: 'auth/user-complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PROFILE = {
  route: 'users/me',
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const CHANGE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_PROFILE_PICTURE = {
  route: 'users/me/upload-profile-picture',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_LOGIN = {
  route: 'socialLogin',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const DELETE_USER = {
  route: 'users/me/delete-account',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CREATE_POST = {
  route: 'create-post',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_LIST = {
  route: 'vendor/listings/all',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_SERVICE = {
  route: 'user/home/listings',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const LIKES_LIST = {
  route: 'user/home/wish-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_NOTIFICATION = {
  route: 'users/notifications',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_TERMSCONDITION = {
  route: 'documentations/terms-and-conditions',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PRIVACY = {
  route: 'documentations/privacy-policy',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_BOOKINGS = {
  route: 'vendor/bookings',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_NOTIFICATION_ONOFF = {
  route: 'users/preferences',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SERVICE_DETAIL = {
  route: 'user/home/listing-detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const NEAR_BY_USER_LIST = {
  route: 'nearby-users-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_LEVELS_BY_ID = {
  route: 'levels',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEND_REQUEST = {
  route: 'send-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPLOAD_image = {
  route: 'feedbacks/upload-picture',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CREATE_HEEDBACK = {
  route: 'feedbacks',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CREATE_BOOKING = {
  route: 'user/home/create-booking',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SENT_REQUEST_LIST = {
  route: 'sent-request-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const RECEIVED_REQUEST = {
  route: 'received-requests',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ACCEPT_REJECT_REQUEST = {
  route: 'vendor/bookings/accept-reject',
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const FRIEND_LIST = {
  route: 'friend-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const MY_POST = {
  route: 'my-posts',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_LIKE = {
  route: 'like',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const LIKE_SERVICE = {
  route: 'user/home/fav-unfav',
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const COMMENT = {
  route: 'comment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMMENT_LIST = {
  route: 'comments-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_COMMENT = {
  route: 'delete-comment',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const POST_GALLERY = {
  route: 'posts-gallery',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const REPORT_POST = {
  route: 'report-post',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEARCH_USERS = {
  route: 'search-users',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_POST = {
  route: 'delete-post',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const PROFILE_DETAILS = {
  route: 'profile-details',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UNFRIEND = {
  route: 'unfriend',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_COMMENT = {
  route: 'edit-comment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_REEL = {
  route: 'add-reel',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const REELS_LIST = {
  route: 'reels-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_REEL = {
  route: 'delete-reel',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const ADD_STORY = {
  route: 'add-story',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STORIES_LIST = {
  route: 'stories-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const MY_STORIES = {
  route: 'my-stories',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEND_IMAGE = {
  route: 'send-image',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHAT_LIST = {
  route: 'chat-list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const MY_REELS = {
  route: 'my-reels',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const callRequest = function (
  url,
  data,
  parameter,
  urlParameter,
  header = {},
  // ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token =
      store?.getState()?.authReducer?.userToken !== null
        ? store?.getState()?.authReducer?.userToken
        : '';
    console.log('_access_token', _access_token);
    // const _access_token = '';
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: _access_token.includes('Bearer ')
            ? _access_token
            : 'Bearer ' + _access_token,
        },
      };
    }
  }


  const _url =
    parameter &&
      !_.isEmpty(parameter) &&
      urlParameter &&
      !_.isEmpty(urlParameter)
      ? `${url.route}/${urlParameter}?${parameter?.key}=${parameter?.value}`
      : parameter && !_.isEmpty(parameter)
        ? `${url.route}?${parameter?.key}=${parameter?.value}`
        : urlParameter && !_.isEmpty(urlParameter)
          ? `${url.route}/${urlParameter}`
          : url.route;
  console.log('_url', url);
  console.log('_url', _url);
  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PATCH) {
    return ApiSauce.patch(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

export default {
  SOCIAL_SIGIN,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  SIGNUP,
  RESEND_OTP,
  VERIFY_OTP,
  CHANGE_PASSWORD,
  LOGOUT,
  RESEND_PASSWORD,
  FORGOT_PASSWORD,
};
