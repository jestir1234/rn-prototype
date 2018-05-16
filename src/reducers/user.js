import { UserAction } from '../actions'

let initState = {};

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case UserAction.REQUEST_AUTHENTICATION:
      return Object.assign({}, state, { isLoading: true, authErrorMessage: null });
    case UserAction.RECEIVED_AUTHENTICATION:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        userInfo: action.userInfo,
        emailErrorMessage: null,
        passwordErrorMessage: null,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_USER_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        userInfo: null,
        emailErrorMessage: action.authErrorMessage,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        userInfo: null,
        passwordErrorMessage: action.authErrorMessage,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        emailErrorMessage: null,
        passwordErrorMessage: null,
        authErrorMessage: action.authErrorMessage
      });
    case UserAction.RECEIVED_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        emailErrorMessage: null,
        passwordErrorMessage: null,
        authErrorMessage: null
      });
    case UserAction.RECEIVED_LOGOUT_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        emailErrorMessage: null,
        passwordErrorMessage: null,
        authErrorMessage: action.errorMessage
      });
    case UserAction.STOP_LOADING:
      return Object.assign({}, state, { isLoading: false });
    case UserAction.RESET_USER_ERROR:
      return Object.assign({}, state, { emailErrorMessage: null });
    case UserAction.RESET_PASSWORD_ERROR:
      return Object.assign({}, state, { passwordErrorMessage: null });
    default:
      return state;
  }
};

export default userReducer;
