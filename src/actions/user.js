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

export const RECEIVED_AUTHENTICATION = 'RECEIVED_AUTHENTICATION'
function receivedAuthentication(userInfo) {
  console.log('dispatching received authentication')
  return {
    type: RECEIVED_AUTHENTICATION,
    userInfo: userInfo
  }
}

export const RECEIVED_AUTHENTICATION_ERROR = 'RECEIVED_AUTHENTICATION_ERROR'
function receivedAuthenticationError(authenticationErrorType) {
  console.log('dispatching authentication error')
  return {
    type: RECEIVED_AUTHENTICATION_ERROR,
    authenticationErrorType: authenticationErrorType
  }
}

export function requestLogIn(username, password) {
  return dispatch => {
    dispatch(requestAuthentication())
    if (!username || username.length === 0) {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY))
      } else {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_USER_EMPTY))
      }
    } else {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_PASSWORD_EMPTY))
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
        let userInfo = new UserInfo(json);
        console.log(userInfo);
        //saveAuthCredentialsToStorage(userInfo);
        dispatch(receivedAuthentication(userInfo));
      })
  }
}

export function loadAuthCredentialsFromStorage() {
  return dispatch => {
    dispatch(requestAuthentication())
    DefaultPreference.get(USER_INFO_STORAGE_KEY)
    .then(userInfoString => {
      if (!userInfoString || userInfoString.length === 0) {
        dispatch(receivedAuthenticationError(null))
      } else {
        let userInfo = new UserInfo(userInfoString);
        let elapsedTime = Date.now().valueOf - userInfo.received_at;
        if (elapsedTime > userInfo.expiresIn) {
          refreshToken();
        } else {
          dispatch(receivedAuthentication(userInfo));
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
  dispatch(receivedAuthenticationError(''))
}
