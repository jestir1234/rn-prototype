import 'cross-fetch/polyfill'
import DefaultPreference from 'react-native-default-preference'
import { UserInfo, UserInfoInit, UserInfoLoaded } from '../entities'
import { Urls } from '../res'

export const USER_INFO_STORAGE_KEY = 'USER_INFO_STORAGE_KEY'

export const AuthenticationErrorType = {
  AUTHENTICATION_ERROR_USER_EMPTY: 'AUTHENTICATION_ERROR_USER_EMPTY',
  AUTHENTICATION_ERROR_PASSWORD_EMPTY: 'AUTHENTICATION_ERROR_PASSWORD_EMPTY',
  AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY: 'AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY',
  AUTHENTICATION_ERROR_WRONG_CREDENTIALS: 'AUTHENTICATION_ERROR_WRONG_CREDENTIALS'
}

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
function requestAuthentication() {
  return {
    type: REQUEST_AUTHENTICATION
  }
}

export const RECEIVED_AUTHENTICATION = 'RECEIVED_AUTHENTICATION'
function receivedAuthentication(userInfo) {
  return {
    type: RECEIVED_AUTHENTICATION,
    userInfo: userInfo
  }
}

export const RECEIVED_AUTHENTICATION_ERROR = 'RECEIVED_AUTHENTICATION_ERROR'
function receivedAuthenticationError(errorType, errorMessage) {
  return {
    type: RECEIVED_AUTHENTICATION_ERROR,
    authErrorType: errorType,
    authErrorMessage: errorMessage
  }
}

export function requestLogIn(username, password) {
  return dispatch => {
    dispatch(requestAuthentication());
    if (!username || username.length === 0) {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY, null));
      } else {
        return dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_USER_EMPTY, null));
      }
    } else {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_PASSWORD_EMPTY, null));
      }
    }

    let params = '?country=ML'
    return fetch(Urls.LOGIN_URL + params, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        })
      })
      .then(response => {
        console.log(response);
        if (response.status >= 400) {
          let error = new Error(response.statusText);
          error.response = response;
          console.log(error);
          throw error;
        }
        return response.json();
      })
      .then(json => {
        let userInfo = new UserInfo(json);
        console.log(userInfo);
        dispatch(receivedAuthentication(userInfo));
      }).catch(e => {
        console.log(e);
        if (!e.message) {
          e.message = "Something went wrong! Please check your credentials and try again!";
        }
        dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_WRONG_CREDENTIALS, e.message));
      });
  }
}

export function checkAuthCredentials() {
  return (dispatch, getState) => {
    dispatch(requestAuthentication());
    let userInfo = getState().user.userInfo;
    if (userInfo !== undefined && userInfo !== null){
      let elapsedTime = Date.now() - userInfo.received_at;
      if (elapsedTime > userInfo.expires_in * 1000) {
        console.log('Authentication: need to refresh');
        dispatch(refreshToken(userInfo.refreshToken));
      } else {
        console.log('Authentication: all good');
        dispatch(receivedAuthentication(userInfo));
      }
    } else {
      console.log('Authentication: nothing stored');
      dispatch(receivedAuthenticationError(null, null));
    }
  }
}

function refreshToken(refreshToken) {
  return dispatch => {
    let params = '?country=ML'
    fetch(Urls.LOGIN_URL + params, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'refreshToken': refreshToken
      })
    })
    .then(response => {
      console.log(response);
      if (response.status >= 400) {
        let error = new Error(response.statusText);
        error.response = response;
        console.log(error);
        throw error;
      }
      return response.json();
    })
    .then(json => {
      let userInfo = new UserInfo(json);
      console.log(userInfo);
      dispatch(receivedAuthentication(userInfo));
    }).catch(e => {
      console.log(e);
      dispatch(requestLogOut());
    });
  }
}

export const RECEIVED_LOGOUT = 'RECEIVED_LOGOUT'
function receivedLogOut() {
  return {
    type: RECEIVED_LOGOUT
  }
}

export const RECEIVED_LOGOUT_ERROR = 'RECEIVED_LOGOUT_ERROR'
function receivedLogOutError(errorMessage) {
  return {
    type: RECEIVED_LOGOUT_ERROR,
    errorMessage: errorMessage
  }
}

export function requestLogOut() {
  return dispatch => {
    dispatch(requestAuthentication());
    dispatch(receivedLogOut());
  }
}
