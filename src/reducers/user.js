import { UserAction } from '../actions'

let initState = {
  isLoggedIn: false,
  isLoading: false,
  userInfo: null,
  authErrorType: null
};

const userReducer = (state = initState, action) => {
  console.log('user action reduced');
  console.log('state: ' + JSON.stringify(state));
  console.log('action: ' + JSON.stringify(action));
  let newState;
  switch(action.type) {
    case UserAction.REQUEST_AUTHENTICATION:
      newState = Object.assign({}, state, { isLoading: true });
      break;
    case UserAction.RECEIVED_AUTHENTICATION:
      newState = Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        userInfo: action.userInfo,
        authErrorType: null
      });
      break;
    case UserAction.RECEIVED_AUTHENTICATION_ERROR:
      newState = Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        userInfo: null,
        authErrorType: action.authenticationErrorType
      });
      break;
    default:
      console.log('returning default')
      return state;
  }
  console.log('new state: ' + JSON.stringify(newState));
  return newState;
};

export default userReducer;
