import { UserAction } from '../actions'

let initState = {
  isLoggedIn: false,
  isLoading: false,
  userInfo: null,
  authErrorType: null
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
        authErrorType: null
      });
    case UserAction.RECEIVED_AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        authErrorType: action.authenticationErrorType
      });
    default:
      console.log('returning default')
      return state;
  }
};

export default userReducer;
