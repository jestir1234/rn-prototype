import { UserInfo } from '../entities'
import { UserAction } from '../actions'

let initState = {
  isLoggedIn: false,
  isLoading: false
};

const dataReducer = (state = initState, action) => {
  switch(action.type) {
    case UserAction.LOG_IN:
      let newState = Object.assign({}, state, { isLoggedIn: true, userInfo: fakeUser(action.username) });
      return newState;
    default:
      return state;
  }
};

let fakeUser = (username) => {
  return new UserInfo(username, "ACEESS_TOKEN_WILL_BE_HERE", "REFRESH_TOKEN_WILL_BE_HERE");
};

export default dataReducer;
