import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {loginUser} from '../redux/actions/authAction';
import {loaderStart, loaderStop} from '../redux/actions/appAction';
import API_URL, {
  callRequest,
  GET_LIST,
  NEAR_BY_USER_LIST,
  SEND_REQUEST,
  SENT_REQUEST_LIST,
  RECEIVED_REQUEST,
  ACCEPT_REJECT_REQUEST,
  FRIEND_LIST,
  MY_POST,
  GET_PROFILE,
  LIKES_LIST,
  DELETE_COMMENT,
  GET_TERMSCONDITION,
  DELETE_POST,
  PROFILE_DETAILS,
  GET_PRIVACY,
  GET_ABOUT,
  GET_ALL_LEVELS_BY_ID,
  GET_NOTIFICATION_ONOFF,
  GET_ALL_LEVELS,
  UPLOAD_image,GET_NOTIFICATION,
  CREATE_HEEDBACK,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import NavService from '../helpers/NavService';
import Util from '../utils/Utils';

function* getEventList() {
  while (true) {
    const {params, responseCallback} = yield take(ActionTypes.GET_LIST.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_LIST,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          if (response?.data?.length > 0) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getAllLevels() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_ALL_LEVELS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_ALL_LEVELS,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          if (response?.data?.length > 0) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error?.error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getNotification() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_NOTIFICATION.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATION,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response);
        if (responseCallback) {
          if (response?.data?.length > 0) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      yield put(loaderStop());
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
 
    }
  }
}
function* getProfile() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_PROFILE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        yield put(loginUser(response?.data));
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofexplorepostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getAllLevelsById() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_ALL_LEVELS_BY_ID.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_ALL_LEVELS_BY_ID,
        null,
        '',
        String(params?.id), // Pass the ID to the URL parameter
        ApiSauce,
        // params?.id
      );
      yield put(loaderStop());
      console.log('sadsa',response)
      if (response) {
        if (responseCallback) {
          responseCallback(response);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofgetnearbyuserlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* nearByUserList() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.NEAR_BY_USER_LIST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        NEAR_BY_USER_LIST,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('resposnessss', response);
      if (response.status === 1) {
        console.log('responseofgetnearbyuserlist', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofgetnearbyuserlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* SendRequest() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.SEND_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SEND_REQUEST,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofsendRequest', response);
        if (responseCallback) {
          responseCallback(true);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofsendREquest', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* SendRequestList() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.SENT_REQUEST_LIST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SENT_REQUEST_LIST,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('resposneofsentrequestlist', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofsentrequestlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* receivedRequest() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.RECEIVED_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RECEIVED_REQUEST,
        null,
        '',
        params?.type,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofreceivedrequest', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged-recived-request');
      }
    } catch (error) {
      console.log('errorofrecievedrequest', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* acceptRejectRequest() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.ACCEPT_REJECT_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        ACCEPT_REJECT_REQUEST,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofacceptrejectrequest', response);
        if (responseCallback) {
          responseCallback(true);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofacceptrejectrequest', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* friendList() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.FRIEND_LIST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FRIEND_LIST,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseoffriendlist', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('erroroffriendlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* myPost() {
  while (true) {
    const {params, responseCallback} = yield take(ActionTypes.MY_POST.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        MY_POST,
        null,
        '',
        params?.user_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofMyPost', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofmyPost', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* listLikes() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.LIKES_LIST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LIKES_LIST,
        null,
        '',
        params?.post_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseoflikeslist', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('erroroflikeslist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* deleteComment() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.DELETE_COMMENT.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_COMMENT,
        null,
        '',
        params?.comment_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofcommentList', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofcommentList', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* deletePost() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.DELETE_POST.REQUEST,
    );
    console.log('paramsindeletepost', params);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_POST,
        null,
        '',
        params?.post_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseiofdeletepost', response);
        if (responseCallback) {
          responseCallback(true);
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofdeletepost', error);
      Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* profileDetails() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.PROFILE_DETAILS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        PROFILE_DETAILS,
        null,
        '',
        params?.user_id,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseofprofiledetails', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofprofiledetails', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}
function* getTermsAndCondition() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_TERMSCONDITION.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_TERMSCONDITION,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          if (response?.data) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* getPrivacy() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_PRIVACY.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_PRIVACY,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          if (response?.data) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* getAbout() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_ABOUT.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_ABOUT,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          if (response?.data) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('errorofgetpostlist', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* getNotificationOnOff() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_NOTIFICATION_ONOFF.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATION_ONOFF,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        if (responseCallback) {
          if (response?.data) {
            responseCallback(response?.data);
          } else {
            responseCallback([]);
          }
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      console.log('error?.responseerror?.response', error?.response);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* uploadImage() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.UPLOAD_IMAGE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPLOAD_image,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.data) {
        console.log('responseofsendRequest', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofsendREquest', error);
      // Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* createHeedback() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.CREATE_HEEDBACK.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_HEEDBACK,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('responseresponse', response);
      if (response) {
        NavService.navigate('FeedBackSend');
        Util.DialogAlert(response.message, 'success');
        console.log('responseofsendRequest', response);
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofsendREquest', error);
      Util.DialogAlert(error?.error);
      yield put(loaderStop());
    }
  }
}


export default function* root() {
  yield fork(getEventList);
  yield fork(getAllLevels);
  yield fork(getProfile);
  yield fork(nearByUserList);
  yield fork(SendRequest);
  yield fork(SendRequestList);
  yield fork(receivedRequest);
  yield fork(acceptRejectRequest);
  yield fork(friendList);
  yield fork(myPost);
  yield fork(listLikes);
  yield fork(deleteComment);
  yield fork(getAbout);
  yield fork(getTermsAndCondition);
  yield fork(deletePost);
  yield fork(profileDetails);
  yield fork(getPrivacy);
  yield fork(getNotificationOnOff);
  yield fork(uploadImage);
  yield fork(createHeedback);
  yield fork(getAllLevelsById);
  yield fork(getNotification);
}
