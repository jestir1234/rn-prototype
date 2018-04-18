/*
* Action constants
*/
export const LOG_IN = "LOG_IN"


/*
* Action creators
*/
export function newActionLogIn(username, password) {
  return {
    type: LOG_IN,
    username: username,
    password: password
  }
}
