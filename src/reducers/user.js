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
    default:
      return state;
  }
};

export default userReducer;
