import fetch from 'cross-fetch'
import DefaultPreference from 'react-native-default-preference'
import { UserInfo, UserInfoInit, UserInfoLoaded } from '../entities'

const USER_INFO_STORAGE_KEY = 'USER_INFO_STORAGE_KEY'

export const AuthenticationErrorType = {
  AUTHENTICATION_ERROR_USER_EMPTY: 'AUTHENTICATION_ERROR_USER_EMPTY',
  AUTHENTICATION_ERROR_PASSWORD_EMPTY: 'AUTHENTICATION_ERROR_PASSWORD_EMPTY',
  AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY: 'AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY',
  AUTHENTICATION_ERROR_WRONG_CREDENTIALS: 'AUTHENTICATION_ERROR_WRONG_CREDENTIALS'
}

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
function requestAuthentication() {
  console.log('dispatching request authentication')
  return {
    type: REQUEST_AUTHENTICATION
  }
}

export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION'
function receiveAuthentication(userInfo) {
  console.log('dispatching received authentication')
  return {
    type: RECEIVE_AUTHENTICATION,
    userInfo: userInfo
  }
}

export const RECEIVE_AUTHENTICATION_ERROR = 'RECEIVE_AUTHENTICATION_ERROR'
function receiveAuthenticationError(authenticationErrorType) {
  console.log('dispatching authentication error')
  return {
    type: RECEIVE_AUTHENTICATION_ERROR,
    authenticationErrorType: authenticationErrorType
  }
}

export function requestLogIn(username, password) {
  return dispatch => {
    dispatch(requestAuthentication())
    if (!username || username.length === 0) {
      if (!password || password.length === 0) {
        return dispatch(receiveAuthenticationError(AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY))
      } else {
        return dispatch(receiveAuthenticationError(AUTHENTICATION_ERROR_USER_EMPTY))
      }
    } else {
      if (!password || password.length === 0) {
        return dispatch(receiveAuthenticationError(AUTHENTICATION_ERROR_PASSWORD_EMPTY))
      }
    }
    return fetch('https://gw-staging.hellofresh.com/login?country=ML', {
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
      .then(response => response.json())
      .then(json => {
        let userInfo = new UserInfo(json, Date.now());
        console.log(userInfo);
        //saveAuthCredentialsToStorage(userInfo);
        dispatch(receiveAuthentication(userInfo));
      })
  }
}

export function loadAuthCredentialsFromStorage() {
  return dispatch => {
    dispatch(requestAuthentication())
    DefaultPreference.get(USER_INFO_STORAGE_KEY)
    .then(userInfoString => {
      if (!userInfoString || userInfoString.length === 0) {
        dispatch(receiveAuthenticationError(null))
      } else {
        let userInfo = new UserInfo(userInfoString, userInfoString.receivedAt);
        let elapsedTime = Date.now().valueOf - userInfo.receivedAt;
        if (elapsedTime > userInfo.expiresIn) {
          refreshToken();
        } else {
          dispatch(receiveAuthentication(userInfo));
        }
      }
    })
  }
}

function saveAuthCredentialsToStorage(userInfo) {
  DefaultPreference.set(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo))
  .then(function() {
    console.log('Authentication: saved userInfo')
  })
}

function refreshToken(refreshToken) {
  // TODO (se): make an actual call to refresh the token
  dispatch(receiveAuthenticationError(''))
}
