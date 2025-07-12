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
  DELETE_COMMENT,
  GET_TERMSCONDITION,
  DELETE_POST,
  GET_PRIVACY,
  GET_ABOUT,
  GET_ALL_LEVELS_BY_ID,
  GET_NOTIFICATION_ONOFF,
  UPLOAD_image,GET_NOTIFICATION,
  CREATE_HEEDBACK,
  GET_SERVICE,
  SERVICE_DETAIL,
  LIKE_SERVICE,
  LIKES_LIST,
  CREATE_BOOKING,
  GET_BOOKINGS,
  GET_MESSAGES,
  GET_CHAT_LIST,
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
function* getServices() {
  while (true) {
    const { responseCallback} = yield take(
      ActionTypes.GET_SERVICE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_SERVICE,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse00000', response?.data?.data);
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

function* likeList() {
  while (true) {
    const {responseCallback} = yield take(
      ActionTypes.LIKES_LIST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LIKES_LIST,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse00000', response?.data?.data);
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

function* getNotification() {
  while (true) {
    const {responseCallback} = yield take(
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
function* getServicesDetail() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.SERVICE_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SERVICE_DETAIL,
        null,
        '',
        String(params),
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        // yield put(loginUser(response?.data));
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
function* fcmToken() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.REFERESH_TOKEN.REQUEST,
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
      if (response) {
        console.log('responseofsendRequest--', response);
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
    const { params, payload, responseCallback} = yield take(
      ActionTypes.ACCEPT_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        ACCEPT_REJECT_REQUEST,
        payload,
        '',
         String(params),
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('responseofacceptrejectrequest', response);
        if (responseCallback) {
          Util.DialogAlert(response?.message);
          responseCallback(response);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('errorofacceptrejectrequest', error);
      Util.DialogAlert(error?.message);
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
function* getChatMessages() {
  while (true) {
    const { params, responseCallback } = yield take(ActionTypes.GET_MESSAGES.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_MESSAGES, 
        '',
        params,
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('------ddfsdfsff',response)
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      responseCallback([]);
      yield put(loaderStop());
    }
  }
}
function* likeService() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.LIKE_SERVICE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LIKE_SERVICE,
        null,
        '',
        String(params),
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('likeServicelikeServicelikeService', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('likeServicelikeServicelikeService', error);
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

function* getBooking() {
  while (true) {
    const {responseCallback} = yield take(
      ActionTypes.GET_BOOKINGS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_BOOKINGS,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('Bookings data', response);
        if (responseCallback) {
          if (response) {
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

function* createBooking() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.CREATE_BOOKING.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_BOOKING,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('responseresponse', response);
      if (response) {
             Util.DialogAlert(response.message, 'success');
        if (responseCallback) {
          responseCallback(response);
        }
      } else {
        console.log('errrorr-logged');
      }
    } catch (error) {
      console.log('error?.responseerror?.response', error?.response);
           Util.DialogAlert(error?.message);
      yield put(loaderStop());
    }
  }
}

function* createRating() {
  while (true) {
    const { payload } = yield take(ActionTypes.CREATE_HEEDBACK.REQUEST);
    console.log('payloadpayload',payload)
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_HEEDBACK,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('login user', response?.data);
           Util.DialogAlert(response.message, 'success');
           NavService.goBack()
      }
    } catch (error) {
      console.log('-----errorerror----', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getChatList() {
  while (true) {
    const { params, responseCallback } = yield take(ActionTypes.GET_CHAT_LIST.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_CHAT_LIST,
        null,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('----responseresponse', response?.data);
        if (responseCallback) {
          responseCallback(response?.data);
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

export default function* root() {
  yield fork(getEventList);
  yield fork(getServices);
  yield fork(getServicesDetail);
  yield fork(nearByUserList);
  yield fork(fcmToken);
  yield fork(SendRequestList);
  yield fork(receivedRequest);
  yield fork(acceptRejectRequest);
  yield fork(friendList);
  yield fork(myPost);
  yield fork(likeService);
  yield fork(likeList);
  yield fork(getBooking);
  yield fork(getTermsAndCondition);
  yield fork(getPrivacy);
  yield fork(getNotificationOnOff);
  yield fork(uploadImage);
  yield fork(createRating);
  yield fork(getAllLevelsById);
  yield fork(getNotification);
  yield fork(createBooking)
  yield fork(getChatMessages)
  yield fork(getChatList)
}
