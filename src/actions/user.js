import 'cross-fetch/polyfill'
import DefaultPreference from 'react-native-default-preference'
import { UserInfo, UserInfoInit, UserInfoLoaded } from '../entities'
import * as Res from '../res'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const AuthenticationErrorType = {
  AUTHENTICATION_ERROR_USER: 'AUTHENTICATION_ERROR_USER',
  AUTHENTICATION_ERROR_PASSWORD: 'AUTHENTICATION_ERROR_PASSWORD',
  AUTHENTICATION_ERROR_REQUEST: 'AUTHENTICATION_ERROR_REQUEST'
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

export const RECEIVED_USER_ERROR = 'RECEIVED_USER_ERROR'
export const RECEIVED_PASSWORD_ERROR = 'RECEIVED_PASSWORD_ERROR'
export const RECEIVED_AUTHENTICATION_ERROR = 'RECEIVED_AUTHENTICATION_ERROR'
function receivedAuthenticationError(errorType, errorMessage) {
  switch(errorType) {
    case AuthenticationErrorType.AUTHENTICATION_ERROR_USER:
      return {
        type: RECEIVED_USER_ERROR,
        authErrorMessage: errorMessage
      };
    case AuthenticationErrorType.AUTHENTICATION_ERROR_PASSWORD:
      return {
        type: RECEIVED_PASSWORD_ERROR,
        authErrorMessage: errorMessage
      };
    default:
      return {
        type: RECEIVED_AUTHENTICATION_ERROR,
        authErrorMessage: errorMessage
      };
  }
}

export const RESET_USER_ERROR = 'RESET_USER_ERROR'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
function resetTextInputError(isUserInputField) {
  if (isUserInputField) {
    return {
      type: RESET_USER_ERROR
    }
  } else {
    return {
      type: RESET_PASSWORD_ERROR
    }
  }
}

export const STOP_LOADING = 'STOP_LOADING'
function stopLoading() {
  return {
    type: STOP_LOADING
  }
}

export function requestLogIn(username, password) {
  return dispatch => {
    dispatch(requestAuthentication());
    let isValid = true;
    if (!username || username.length === 0) {
      dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_USER, Res.Strings.login_error_no_email));
      isValid = false;
    } else if (!EMAIL_REGEX.test(username)){
      dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_USER, Res.Strings.login_error_invalid_email));
      isValid = false;
    } else {
      dispatch(resetTextInputError(true));
    }
    if (!password || password.length === 0) {
      dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_PASSWORD, Res.Strings.login_error_no_password));
      isValid = false;
    } else {
      dispatch(resetTextInputError(false));
    }
    if (!isValid) {
      return dispatch(stopLoading());
    }
    let params = '?country=ML'
    return fetch(Res.Urls.LOGIN_URL + params, {
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
          e.message = Res.Strings.login_error_server;
        }
        dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_REQUEST, e.message));
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
      dispatch(receivedAuthenticationError(AuthenticationErrorType.AUTHENTICATION_ERROR_REQUEST, null));
    }
  }
}

function refreshToken(refreshToken) {
  return dispatch => {
    let params = '?country=ML'
    fetch(Res.Urls.LOGIN_URL + params, {
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
