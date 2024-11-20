import {
  CURRENTUSERPROFILE,
  ISUSERLOGIN,
  CURRENTLOGINUSERINFO,
  USERLOGINDATA,
  USERLOGINTOKEN,
  USERLOGOUT,
  VERIFY_POPUP,
  SAVEEMAILFORUSER,
  SET_ROLE,SET_OTP_DATA
} from '../../constants';

const INITIAL_STATE = {
  isUserLogin: false,
  user: null,
  userToken: null,
  currentUserProfile: {},
  verificationPopUp: false,
  email: null,
  role: '',
  otpData:null
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENTUSERPROFILE:
      return {
        ...states,
        currentUserProfile: action.payload,
      };
    case ISUSERLOGIN:
      return {
        ...states,
        isUserLogin: action.payload,
      };
    case CURRENTLOGINUSERINFO:
      return {
        ...states,
        user: action.payload,
      };
    case SET_ROLE:
      return {
        ...states,
        role: action.payload,
      };
      case SET_OTP_DATA:
        return {
          ...states,
          otpData: action.payload,
        };
    case USERLOGINDATA:
      return {
        ...states,
        user: action.payload,
        isUserLogin: true,
      };
    case SAVEEMAILFORUSER:
      return {
        ...states,
        email: action.payload,
      };
    case USERLOGINTOKEN:
      return {
        ...states,
        userToken: action.payload,
      };
    case VERIFY_POPUP:
      return {
        ...states,
        verificationPopUp: action.payload,
      };
    case USERLOGOUT:
      return {
        ...states,
        user: null,
        userToken: null,
        isUserLogin: false,
        currentUserProfile: {},
      };
    default:
      return states;
  }
};
