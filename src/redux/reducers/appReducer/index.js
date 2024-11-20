import {LOADER, ERRMSG, ALL_EVENT, SEARCHEDREST} from '../../constants';

const INITIAL_STATE = {
  loader: false,
  errMsg: '',
  searchedRest: [],
  addModal: false,
  currentUserLocation: null,
  socket: null,
  stories: [],
  indexOfCurrentVisibleView: 0,
  refOfCurrentVisible: null,
  events: [],
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADER_START':
      return {
        ...states,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...states,
        loader: false,
      };
    case ALL_EVENT:
      return {
        ...states,
        events: action.payload,
        isUserLogin: true,
      };
    case 'TOGGLE_ADD_PROPERTY_MODAL':
      return {
        ...states,
        addModal: action?.payload,
      };
    case 'SAVE_CURRENT_USER_LOCATION':
      return {
        ...states,
        currentUserLocation: action.payload,
      };
    case 'SAVE_SOCKET':
      return {
        ...states,
        socket: action.payload,
      };
    case 'SET_SOCKET':
      return {
        ...states,
        socket: action.payload,
      };
    case 'LOGOUT_AND_REMOVE_INFO':
      return {
        socket: null,
      };
    case 'SAVE_INDEX_FOR_CURRENT_VISIBLE_VIEW':
      return {
        ...states,
        indexOfCurrentVisibleView: action.payload,
      };
    case 'SAVE_REF_FOR_CURRENT_VISIBLE_VIEW':
      return {
        ...states,
        refOfCurrentVisible: action.payload,
      };
    case ERRMSG:
      return {
        ...states,
        errMsg: action.payload,
      };
    case SEARCHEDREST:
      return {
        ...states,
        searchedRest: action.payload,
      };
    case 'STORY_DATA':
      console.log('statetettetee', action.payload);
      return {
        ...states,
        stories: action.payload,
      };

    default:
      return states;
  }
};
