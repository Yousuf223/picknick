
import store from '../../index';
import ActionTypes, { ALL_EVENT } from '../../constants';
function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  return {
    type: 'LOADER_START',
  };
}
export function getEvent(payload) {
  return {
    type: ALL_EVENT,
    payload,
  };
}
export function loaderStartWithDispatch() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStopWithDispatch() {
  dispatch({type: 'LOADER_STOP'});
}
export function loaderStop() {
  return {
    type: 'LOADER_STOP',
  };
}
export function saveCurrentUserLocation(location) {
  return {
    type: 'SAVE_CURRENT_USER_LOCATION',
    payload: location,
  };
}
// export const getDeviceToken = async () => {
//   try {
//     // await messaging().registerDeviceForRemoteMessages();
//     const token = await messaging().getToken();
//     if (token) return token;
//     else return '';
//   } catch (error) {
//     console.log(error);
//   }
// };

export function createPost(params, responseCallback) {
  return {
    type: ActionTypes.CREATE_POST.REQUEST,
    params,
    responseCallback,
  };
}
export function getEventList(params, responseCallback) {
  return {
    type: ActionTypes.GET_LIST.REQUEST,
    params,
    responseCallback,
  };
}
export function getAllLevels(params, responseCallback) {
  return {
    type: ActionTypes.GET_ALL_LEVELS.REQUEST,
    params,
    responseCallback,
  };
}
export function getNotification(params, responseCallback) {
  return {
    type: ActionTypes.GET_NOTIFICATION.REQUEST,
    params,
    responseCallback,
  };
}
export function getAllLevelsById(params, responseCallback) {
  return {
    type: ActionTypes.GET_ALL_LEVELS_BY_ID.REQUEST,
    params,
    responseCallback,
  };
}
export function getProfile(params, responseCallback) {
  return {
    type: ActionTypes.GET_PROFILE.REQUEST,
    params,
    responseCallback,
  };
}
export function nearByUserList(params, responseCallback) {
  return {
    type: ActionTypes.NEAR_BY_USER_LIST.REQUEST,
    params,
    responseCallback,
  };
}
export function SendRequest(params, responseCallback) {
  return {
    type: ActionTypes.SEND_REQUEST.REQUEST,
    params,
    responseCallback,
  };
}
export function SendRequestList(params, responseCallback) {
  return {
    type: ActionTypes.SENT_REQUEST_LIST.REQUEST,
    params,
    responseCallback,
  };
}
export function receivedRequest(params, responseCallback) {
  return {
    type: ActionTypes.RECEIVED_REQUEST.REQUEST,
    params,
    responseCallback,
  };
}
export function acceptRejectRequest(params, responseCallback) {
  return {
    type: ActionTypes.ACCEPT_REJECT_REQUEST.REQUEST,
    params,
    responseCallback,
  };
}
export function friendList(params, responseCallback) {
  return {
    type: ActionTypes.FRIEND_LIST.REQUEST,
    params,
    responseCallback,
  };
}
export function myPost(params, responseCallback) {
  return {
    type: ActionTypes.MY_POST.REQUEST,
    params,
    responseCallback,
  };
}
export function like(params, responseCallback) {
  return {
    type: ActionTypes.API_LIKE.REQUEST,
    params,
    responseCallback,
  };
}
export function listLikes(params, responseCallback) {
  return {
    type: ActionTypes.LIKES_LIST.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteComment(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_COMMENT.REQUEST,
    params,
    responseCallback,
  };
}
export function reportPost(params, responseCallback) {
  return {
    type: ActionTypes.REPORT_POST.REQUEST,
    params,
    responseCallback,
  };
}
export function searchUsers(params, responseCallback) {
  return {
    type: ActionTypes.SEARCH_USERS.REQUEST,
    params,
    responseCallback,
  };
}
export function deletePost(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_POST.REQUEST,
    params,
    responseCallback,
  };
}
export function profileDetails(params, responseCallback) {
  return {
    type: ActionTypes.PROFILE_DETAILS.REQUEST,
    params,
    responseCallback,
  };
}
export function unFriend(params, responseCallback) {
  return {
    type: ActionTypes.UNFRIEND.REQUEST,
    params,
    responseCallback,
  };
}
export function editComment(params, responseCallback) {
  return {
    type: ActionTypes.EDIT_COMMENT.REQUEST,
    params,
    responseCallback,
  };
}
export function uploadImage(params, responseCallback) {
  return {
    type: ActionTypes.UPLOAD_IMAGE.REQUEST,
    params,
    responseCallback,
  };
}
export function createHeedback(params, responseCallback) {
  return {
    type: ActionTypes.CREATE_HEEDBACK.REQUEST,
    params,
    responseCallback,
  };
}

export function chatList(params, responseCallback) {
  return {
    type: ActionTypes.CHAT_LIST.REQUEST,
    params,
    responseCallback,
  };
}


export function getPrivacy(params, responseCallback) {
  return {
    type: ActionTypes.GET_PRIVACY.REQUEST,
    params,
    responseCallback,
  };
}
export function getTermsAndCondition(params, responseCallback) {
  return {
    type: ActionTypes.GET_TERMSCONDITION.REQUEST,
    params,
    responseCallback,
  };
}

export function getNotificationOnOff(params, responseCallback) {
  return {
    type: ActionTypes.GET_NOTIFICATION_ONOFF.REQUEST,
    params,
    responseCallback,
  };
}

export function getAbout(params, responseCallback) {
  return {
    type: ActionTypes.GET_ABOUT.REQUEST,
    params,
    responseCallback,
  };
}






export function removeDataForLogoutUser() {
  return {
    type: 'LOGOUT_AND_REMOVE_INFO',
  };
}
export function saveIndexForCurrentVisibleView(viewIndex) {
  return {
    type: 'SAVE_INDEX_FOR_CURRENT_VISIBLE_VIEW',
    payload: viewIndex,
  };
}
export function saveRefForCurrentVisibleView(viewIndex) {
  return {
    type: 'SAVE_REF_FOR_CURRENT_VISIBLE_VIEW',
    payload: viewIndex,
  };
}
// export function saveScoket(socket) {
//   dispatch({type: 'SAVE_SOCKET', payload: socket});
// }
export function saveGlobalSocket(socket) {
  dispatch({type: 'SAVE_SOCKET', payload: socket});
}
export function addStoryData(storyData) {
  dispatch({type: 'STORY_DATA', payload: storyData});
}

