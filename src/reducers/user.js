import { UserAction } from '../actions'

let initState = {
  isLoggedIn: false,
  isLoading: false,
  userInfo: null,
  authErrorType: null,
  authErrorMessage: null
};

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case UserAction.REQUEST_AUTHENTICATION:
      return Object.assign({}, state, { isLoading: true });
    case UserAction.RECEIVED_AUTHENTICATION:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        userInfo: action.userInfo,
        authErrorType: null,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        authErrorType: action.authErrorType,
        authErrorMessage: action.authErrorMessage
      });
    case UserAction.RECEIVED_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        authErrorType: null,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_LOGOUT_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        authErrorType: null,
        authErrorMessage: action.errorMessage
      });
    default:
      return state;
  }
};

export default userReducer;
