import { UserAction } from '../actions'

let initState = {
  userInfo: null
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
        emailErrorMessage: ' ',
        passwordErrorMessage: ' ',
        authErrorMessage: ' '
      });
    case UserAction.RECEIVED_USER_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        userInfo: null,
        emailErrorMessage: action.authErrorMessage,
        authErrorMessage: ' '
      });
    case UserAction.RECEIVED_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        userInfo: null,
        passwordErrorMessage: action.authErrorMessage,
        authErrorMessage: ' '
      });
    case UserAction.RECEIVED_AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        emailErrorMessage: ' ',
        passwordErrorMessage: ' ',
        authErrorMessage: action.authErrorMessage
      });
    case UserAction.RECEIVED_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        emailErrorMessage: ' ',
        passwordErrorMessage: ' ',
        authErrorMessage: ' '
      });
    case UserAction.RECEIVED_LOGOUT_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        emailErrorMessage: ' ',
        passwordErrorMessage: ' ',
        authErrorMessage: action.errorMessage
      });
    case UserAction.STOP_LOADING:
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};

export default userReducer;
