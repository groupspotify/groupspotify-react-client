import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import actions from '../actions';

export const initialState = {
  isRegistering: false,
  isSigningIn: false,
  isSigningOut: false,
  userInfo: null,
  message: null,
  plannerCourses: null,
  coursesInput: [],
  isUploading: false
};
const messageReducer = (_, action) => {
  switch (action.type) {
  case actions.LOGIN_FAILED:
    return action.payload || null;
  case actions.LOGOUT_FAILED:
    return action.payload || null;
  case actions.REGISTER_FAILED:
    return action.payload || null;
  case actions.PLANNER_FAILED:
    return action.payload || null;
  default:
    return null;
  }
};

const isRegisteringReducer = (state = false, action) => {
  switch (action.type) {
  case actions.REGISTER_REQUESTED:
    return true;
  case actions.REGISTER_SUCCEEDED:
  case actions.REGISTER_FAILED:
    return false;
  default:
    return state;
  }
};

const isSigningInReducer = (state = false, action) => {
  switch (action.type) {
  case actions.LOGIN_REQUESTED:
    return true;
  case actions.LOGIN_SUCCEEDED:
    return false;
  case actions.LOGIN_FAILED:
    return false;
  default:
    return state;
  }
};
const isSigningOutReducer = (state = false, action) => {
  switch (action.type) {
  case actions.LOGOUT_REQUESTED:
    return true;
  case actions.LOGOUT_SUCCEEDED:
  case actions.LOGOUT_FAILED:
    return false;
  default:
    return state;
  }
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case actions.LOGIN_SUCCEEDED:
    return action.payload || null;
  case actions.LOGOUT_SUCCEEDED:
    return null;
  default:
    return state;
  }
};

const plannerCoursesReducer = (state = null, action) => {
  switch (action.type) {
  case actions.PLANNER_REQUESTED:
    return null;
  case actions.PLANNER_FAILED:
    return null;
  case actions.PLANNER_SUCCEEDED:
    return action.payload;
  default:
    return state;
  }
};
const coursesInputReducer = (state = null, action) => {
  switch (action.type) {
  case actions.ADD_COURSE:
    if ((state || []).includes(action.payload)) return state;

    return [...(state || []), action.payload];
  case actions.REMOVE_COURSE:
    return (state || []).filter(course => course !== action.payload);
  case actions.FILE_UPLOAD_SUCCEEDED:
    return [...new Set([...(state || []), ...(action.payload || [])])];
  case actions.FILE_UPLOAD_FAILED:
  default:
    return state;
  }
};

const fileUploadReducer = (state = null, action) => {
  switch (action.type) {
  case actions.FILE_UPLOADING:
    return true;
  case actions.FILE_UPLOAD_FAILED:
  case actions.FILE_UPLOAD_SUCCEEDED:
    return false;
  default:
    return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    isSigningIn: isSigningInReducer,
    isSigningOut: isSigningOutReducer,
    userInfo: userReducer,
    isRegistering: isRegisteringReducer,
    message: messageReducer,
    plannerCourses: plannerCoursesReducer,
    coursesInput: coursesInputReducer,
    isUploading: fileUploadReducer
  });
