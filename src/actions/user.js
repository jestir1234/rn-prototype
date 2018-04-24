import fetch from 'cross-fetch'
import { AsyncStorage } from 'react-native'
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
function receivedAuthenticationError(authenticationErrorType) {
  return {
    type: RECEIVED_AUTHENTICATION_ERROR,
    authenticationErrorType: authenticationErrorType
  }
}

export function requestLogIn(username, password) {
  return dispatch => {
    dispatch(requestAuthentication());
    if (!username || username.length === 0) {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY));
      } else {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_USER_EMPTY));
      }
    } else {
      if (!password || password.length === 0) {
        return dispatch(receivedAuthenticationError(AUTHENTICATION_ERROR_PASSWORD_EMPTY));
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
        saveAuthCredentialsToStorage(userInfo);
        dispatch(receivedAuthentication(userInfo));
      });
  }
}

export function loadAuthCredentialsFromStorage() {
  return dispatch => {
    dispatch(requestAuthentication());
    try {
      AsyncStorage.getItem(USER_INFO_STORAGE_KEY)
      .then((userInfoString) => {
        if (userInfoString !== null){
          let userInfo = new UserInfo(JSON.parse(userInfoString));
          let elapsedTime = Date.now().valueOf - userInfo.received_at;
          if (elapsedTime > userInfo.expiresIn) {
            console.log('Authentication: need to refresh');
            refreshToken();
          } else {
            console.log('Authentication: all good');
            dispatch(receivedAuthentication(userInfo));
          }
        } else {
          console.log('Authentication: nothing stored');
          dispatch(receivedAuthenticationError(null));
        }
      });
    } catch (error) {
      console.log('Authentication: error occured');
      dispatch(receivedAuthenticationError(null));
    }
  }
}

function saveAuthCredentialsToStorage(userInfo) {
  try {
    AsyncStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo))
    .then(() => {
      console.log('Authentication: saved userInfo');
    });
  } catch (error) {
    console.log('Authentication: saving userInfo failed');
  }
}

function refreshToken(refreshToken) {
  // TODO (se): make an actual call to refresh the token
  dispatch(receivedAuthenticationError(''));
}
