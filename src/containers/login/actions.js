import { UserAction } from '../../actions'

/*
* Action creators
*/
export function newActionLogIn(username, password) {
  return {
    type: UserAction.LOG_IN,
    username: username,
    password: password
  }
}
